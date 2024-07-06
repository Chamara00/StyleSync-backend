import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// function getTodayName(): string {
//     const today = new Date();
//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     const todayName = today.toLocaleDateString('en-US', options);
//     return todayName;
//   }

export async function StaffAvailability(req: Request, res: Response) {
  const { staffId, serviceId, dayName, date } = req.query;
  try {
    if (!staffId || !serviceId || !dayName || !date) {
      return res.status(400).json({ message: 'Please provide staffId and serviceId' });
    }
    const bookingTimeDate = new Date(String(date));
    const setTime = new Date(bookingTimeDate.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);
    const setDate = new Date(String(setTime));
    setDate.setHours(0, 0, 0, 0);
    const isoString = setDate.toISOString();
    const availableTimeDuration = await prisma.serviceStaff.findMany({
      where: {
        staffId: Number(staffId),
        serviceId: Number(serviceId),
      },
      select: {
        staff: {
          select: {
            openDays: {
              where: {
                dayName: String(dayName),
              },
              select: {
                openHour: true,
                closeHour: true,
                isOpen:true
              },
            },
          },
        },
        Service: {
          select: {
            duration: true,
          },
        },
      },
    });
    const existingAvailableTimeAndDuration = availableTimeDuration.map((a) => ({
      openHour: a.staff.openDays.map((b) => b.openHour),
      closeHour: a.staff.openDays.map((c) => c.closeHour),
      isOpen:a.staff.openDays.map((d)=>d.isOpen),
      duration: a.Service.duration,
    }));

    const unavailableTime = await prisma.appointmentBlock.findMany({
      where: {
        staffId: Number(staffId),
        date: String(isoString),
        isBook: true,
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    const breaks = await prisma.breaks.findMany({
      where: {
        staffId: Number(staffId),
        dayName: String(dayName),
      },
      select: {
        breakStart: true,
        breakEnd: true,
      },
    });
    console.log(unavailableTime);
    return res
      .status(200)
      .json({
        status: 200,
        message: 'Successful',
        data: existingAvailableTimeAndDuration,
        data2: unavailableTime,
        data3: breaks,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registered salons' });
  } finally {
    await prisma.$disconnect();
  }
}
