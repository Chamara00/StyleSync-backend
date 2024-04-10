import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//3.0 show database values in frontend

const prisma = new PrismaClient();

export async function getOpendaysAndHours(req: Request, res: Response) {
    const { staffId } = req.body;
    try{
        if(!staffId){
            return res.status(400).json({ status: 400, error: 'staff id not found' });
        }
        const openDaysAndHours = await prisma.openDays.findMany ({
            where : {
                staffId : staffId
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