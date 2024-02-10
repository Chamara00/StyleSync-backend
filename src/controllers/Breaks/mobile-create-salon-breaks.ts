import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createBreak(req: Request, res: Response) {

    const { salonId, dayName, breakStart, breakEnd  } = req.body;

    try{
        if(!salonId || !dayName || !breakStart || !breakEnd){
            return res.status(400).json({ status: 400, error: 'inputs not found' });
        }
        else{
            const createBreaks = await prisma.breaks.create({
                data: {
                    salonId,
                    dayName,
                    breakStart,
                    breakEnd
                },
            });
            return res.status(201).json({ status: 201, message: 'Step 1 successful', breaks: createBreaks });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process step 1' });
    } finally {
        await prisma.$disconnect();
    }
}