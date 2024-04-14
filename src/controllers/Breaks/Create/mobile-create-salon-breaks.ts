import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//3.2 create breaks

const prisma = new PrismaClient();

export async function createBreak(req: Request, res: Response) {

    const { staffId, dayName } = req.body;

    try{
        if(!staffId || !dayName){
            return res.status(400).json({ status: 400, error: 'inputs not found' });
        }
        else{
            const createBreaks = await prisma.breaks.create({
                data: {
                    staffId,
                    dayName,
                    breakStart:'12:00',
                    breakEnd:'13:00'
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