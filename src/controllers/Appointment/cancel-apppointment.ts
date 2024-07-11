import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cancelAppointments(req: Request, res: Response) {
  const { userId, staffId, startTime, date } = req.body;
  try {
    if (!userId || !staffId || !startTime || !date) {
      return res.status(400).json({ status: 400, error: 'inputs not found' });
    }
    const bookingTimeDate = new Date();
    const setTime = new Date(bookingTimeDate.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);
    const appointments = await prisma.customerAppointmentBlock.updateMany({
      where: {
        customerId: userId,
        staffId: staffId,
        startTime: startTime,
        date: date,
      },
      data: {
        isCancel: true,
      },
    });
    const isBook = await prisma.appointmentBlock.updateMany({
        where:{
            date:date,
            staffId:staffId,
            startTime:startTime
        },
        data:{
            isBook:false,
            bookingTime:setTime
        }
    });
    return res.status(200).json({ status: 200, data: {appointments,isBook} });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  } finally {
    await prisma.$disconnect();
  }
}
