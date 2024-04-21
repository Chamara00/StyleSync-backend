
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export async function getOpendaysAndHours(req: Request, res: Response) {
    const { staffId } = req.query;
    try {
        if (!staffId || typeof staffId !== 'string') {
            return res.status(400).json({ status: 400, error: 'Invalid staff id' });
        }
        
        const openDaysAndHours = await prisma.openDays.findMany({
            where: {
                staffId: parseInt(staffId) // Assuming staffId is a number
            },
            select: {
                dayName: true,
                isOpen: true,
                openHour: true,
                closeHour: true
            }
        });

        return res.status(200).json({ status: 200, data: openDaysAndHours });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Failed to process request' });
    } finally {
        await prisma.$disconnect();
    }
}

