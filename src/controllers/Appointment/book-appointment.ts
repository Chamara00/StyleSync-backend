import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function BookAppointment(req: Request, res: Response) {
  const { userId, date, startTime, endTime, staffId, serviceId, bookingTime } = req.body;
  

  try {
    if (!userId || !date || !startTime || !endTime || !staffId || !serviceId || !bookingTime) {
      return res.status(400).json({ message: 'Inputs not found' });
    }
    const bookingDate = new Date(date);
    const setBookingDate = new Date(bookingDate.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);
    const setDate = new Date(setBookingDate);
    setDate.setHours(0,0,0,0);

    const bookingTimeDate = new Date(bookingTime);
    const setTime = new Date(bookingTimeDate.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);

    
    const appointment = await prisma.appointmentBlock.create({
      data: {
        bookingTime: setTime,
        date: setDate,
        startTime: startTime,
        endTime: endTime,
        isBook: true,
        staffId: staffId,
        customerAppointmentBlock: {
          create: {
            customerId: userId,
            isCancel: false,
            isReject:false
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
