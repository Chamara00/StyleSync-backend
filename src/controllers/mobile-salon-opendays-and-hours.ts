import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getOpendaysAndHours(req: Request, res: Response) {
    const { salonId } = req.body;
    try{
        if(!salonId){
            return res.status(400).json({ status: 400, error: 'salon id not found' });
        }
        const openDaysAndHours = await prisma.openDays.findMany ({
            where : {
                salonId : salonId
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
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}