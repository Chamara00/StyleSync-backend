import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function BookAppointment(req: Request, res: Response) {
  const { userId, date, startTime, endTime, staffId, serviceId, bookingTime } = req.body;
  

  try {
    if (!userId || !date || !startTime || !endTime || !staffId || !serviceId || !bookingTime) {
      return res.status(400).json({ message: 'Inputs not found' });
    }
    const setDate = new Date(date);
    setDate.setHours(0,0,0,0);

    
    const appointment = await prisma.appointmentBlock.create({
      data: {
        bookingTime: bookingTime,
        date: setDate,
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
