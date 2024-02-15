import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//3.2 update existing break

const prisma = new PrismaClient();
 export async function updateBreaks(req: Request, res: Response) {
    const {salonId, dayName, breakStart, breakEnd} = req.body;
    try{
        if(!salonId || !dayName || !breakStart || !breakEnd){
            return res.status(400).json({ status: 400, error: 'salon id or day name not found' });
        }
        else{
            await prisma.breaks.updateMany({
                where: {
                    salonId: salonId,
                    dayName: dayName
                },
                data:{
                    breakStart,
                    breakEnd
                }
            });
            return res.status(201).json({ status: 201, message: 'Update successful' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
 }