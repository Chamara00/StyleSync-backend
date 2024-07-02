import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import moment from 'moment-timezone';

const prisma = new PrismaClient();

export async function BookAppointment(req: Request, res: Response) {
  const { userId, date, startTime, endTime, staffId, serviceId } = req.body;
  

  try {
    if (!userId || !date || !startTime || !endTime || !staffId || !serviceId) {
      return res.status(400).json({ message: 'Inputs not found' });
    }
    const bookingTime = moment().tz('Asia/Kolkata').toDate();
    const appointment = await prisma.appointmentBlock.create({
      data: {
        bookingTime: bookingTime,
        date: new Date(date.setHours(0,0,0,0)),
        startTime: startTime,
        endTime: endTime,
        isBook: true,
        staffId: staffId,
        customerAppointmentBlock: {
          create: {
            customerId: userId,
            isCancel: false,
          },
        },
        serviceAppointmentBlock: {
          create: {
            serviceId: serviceId,
          },
        },
      },
    });

    return res.status(200).json({ status: 200, message: 'Successful', data: appointment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  } finally {
    await prisma.$disconnect();
  }
}
