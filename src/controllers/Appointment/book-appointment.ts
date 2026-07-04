import prisma from '../../utils/prismaClient';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

class SlotConflictError extends Error {}

export async function BookAppointment(req: Request, res: Response) {
  const { userId, date, startTime, endTime, staffId, serviceId, bookingTime } = req.body;

  try {
    if (!userId || !date || !startTime || !endTime || !staffId || !serviceId || !bookingTime) {
      return res.status(400).json({ message: 'Inputs not found' });
    }
    if (!TIME_PATTERN.test(startTime) || !TIME_PATTERN.test(endTime)) {
      return res.status(400).json({ message: 'startTime/endTime must be in HH:mm format' });
    }
    const newStart = toMinutes(startTime);
    const newEnd = toMinutes(endTime);
    if (newStart >= newEnd) {
      return res.status(400).json({ message: 'endTime must be after startTime' });
    }

    const bookingDate = new Date(date);
    const setBookingDate = new Date(bookingDate.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);
    const setDate = new Date(setBookingDate);
    setDate.setHours(0, 0, 0, 0);

    const bookingTimeDate = new Date(bookingTime);
    const setTime = new Date(bookingTimeDate.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);

    const runBookingAttempt = () =>
      prisma.$transaction(
        async (tx) => {
          const existingBlocks = await tx.appointmentBlock.findMany({
            where: {
              staffId: staffId,
              date: setDate,
              isBook: true,
            },
            select: {
              startTime: true,
              endTime: true,
            },
          });

          const hasConflict = existingBlocks.some((block) => {
            const existingStart = toMinutes(block.startTime);
            const existingEnd = toMinutes(block.endTime);
            return newStart < existingEnd && existingStart < newEnd;
          });

          if (hasConflict) {
            throw new SlotConflictError('This time slot is no longer available');
          }

          // appointmentBlock's primary key is [date, startTime, staffId], so a slot freed by a
          // prior cancellation/rejection (isBook: false) still occupies that key. Upsert instead
          // of create so a freed slot can be booked again instead of hitting a P2002 collision.
          const block = await tx.appointmentBlock.upsert({
            where: {
              date_startTime_staffId: {
                date: setDate,
                startTime: startTime,
                staffId: staffId,
              },
            },
            create: {
              bookingTime: setTime,
              date: setDate,
              startTime: startTime,
              endTime: endTime,
              isBook: true,
              staffId: staffId,
            },
            update: {
              bookingTime: setTime,
              endTime: endTime,
              isBook: true,
            },
          });

          await tx.customerAppointmentBlock.upsert({
            where: {
              customerId_date_startTime_staffId: {
                customerId: userId,
                date: setDate,
                startTime: startTime,
                staffId: staffId,
              },
            },
            create: {
              customerId: userId,
              date: setDate,
              startTime: startTime,
              staffId: staffId,
              isCancel: false,
              isReject: false,
            },
            update: {
              isCancel: false,
              isReject: false,
            },
          });

          await tx.serviceAppointmentBlock.upsert({
            where: {
              serviceId_date_startTime_staffId: {
                serviceId: serviceId,
                date: setDate,
                startTime: startTime,
                staffId: staffId,
              },
            },
            create: {
              serviceId: serviceId,
              date: setDate,
              startTime: startTime,
              staffId: staffId,
            },
            update: {},
          });

          return block;
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
      );

    // Serializable transactions can abort with a false-positive conflict (P2034) when two
    // concurrent bookings merely read overlapping data, even if their time ranges don't
    // actually clash. Postgres' documented remedy is to retry the transaction.
    const MAX_ATTEMPTS = 3;
    let appointment;
    for (let attempt = 1; ; attempt++) {
      try {
        appointment = await runBookingAttempt();
        break;
      } catch (error) {
        const isSerializationFailure =
          error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2034';
        if (isSerializationFailure && attempt < MAX_ATTEMPTS) {
          continue;
        }
        throw error;
      }
    }

    return res.status(200).json({ status: 200, message: 'Successful', data: appointment });
  } catch (error) {
    if (error instanceof SlotConflictError) {
      return res.status(409).json({ status: 409, error: error.message });
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === 'P2002' || error.code === 'P2034')
    ) {
      return res
        .status(409)
        .json({ status: 409, error: 'This time slot was just booked by someone else. Please pick another slot.' });
    }
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  }
}
