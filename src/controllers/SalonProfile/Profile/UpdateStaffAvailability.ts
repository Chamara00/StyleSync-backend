import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateStaffAvailability(req: Request, res: Response) {
    const {staffId, date, isOpen} = req.body;
    try{
        if (!staffId || !date || typeof date !== 'string') {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }else(!isOpen || isOpen );{
            const givenDate = new Date(date);
            const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(givenDate); 
             await prisma.openDays.updateMany({
                where: {
                    staffId: staffId,
                    dayName:dayOfWeek
                },
                data: {
                    isOpen: isOpen,
                }
            });
            return res.status(200).json({ status: 200, message: 'successfully display an  appointment.'});
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}