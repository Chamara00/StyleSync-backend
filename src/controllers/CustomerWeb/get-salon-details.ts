import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getTodayName(): string {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  const todayName = today.toLocaleDateString('en-US', options);
  return todayName;
}

export async function SalonDetails(req: Request, res: Response) {
  const { salonId } = req.query;
  try {
    if (!salonId) {
      return res.status(400).json({ message: 'salon id not found' });
    }
    const openTimes = await prisma.salonStaff.findFirst({
      where: {
        salonId: Number(salonId),
      },
      select: {
        staff: {
          select: {
            openDays: {
              where: {
                dayName: getTodayName(),
              },
              select: {
                openHour: true,
                closeHour: true,
                isOpen: true,
              },
            },
          },
        },
      },
    });
    const existingisopen = openTimes?.staff.openDays.map((openTime) => openTime.isOpen);
    const existingCloseTimes = openTimes?.staff.openDays.map((openTime) => openTime.closeHour);
    const existingOpenTimes = openTimes?.staff.openDays.map((openTime) => openTime.openHour);

    return res
      .status(200)
      .json({
        status: 200,
        message: 'successful',
        data1: existingisopen ? 'Opens at ' + existingOpenTimes + ' - ' + existingCloseTimes : 'Closed',
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registered salons' });
  } finally {
    await prisma.$disconnect();
  }
}
