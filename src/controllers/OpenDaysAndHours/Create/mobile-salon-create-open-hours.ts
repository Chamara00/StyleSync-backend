import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//2.0 create default open days and hours and create openDays table in database

const prisma = new PrismaClient();

export async function createOpenHours(req: Request, res: Response) {
    const { salonId } = req.body;
    const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    try {
        if (!salonId) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        } else {
            for (let i = 0; i < days.length; i++) {
                if (days[i] !== 'Saturday' && days[i] !== 'Sunday') {
                    await prisma.openDays.create({
                        data: {
                            salonId,
                            dayName: days[i],
                            isOpen: true,
                            openHour: '09:00', // corrected format
                            closeHour: '17:00', // corrected format
                        },
                    });
                } else {
                    await prisma.openDays.create({
                        data: {
                            salonId,
                            dayName: days[i],
                            isOpen: false,
                        },
                    });
                }
            }
            return res.status(201).json({ status: 201, message: 'Creation successful' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}
