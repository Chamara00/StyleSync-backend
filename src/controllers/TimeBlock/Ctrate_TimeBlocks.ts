import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//3.2 create breaks

const prisma = new PrismaClient();

export async function CreateTimeBlocks(req: Request, res: Response) {

    const { date,StartTime,EndTime,staffId,serviceId , IsBook, duration } = req.body;

    try{
        if( !date|| !StartTime|| !EndTime ||staffId || serviceId  || IsBook || duration  ){
            return res.status(400).json({ status: 400, error: 'inputs not found' });
        }
        else{
            const createTimeBlock = await prisma.timeBlocks.create({
                data: {
                    StartTime,
                    EndTime,
                    staffId,
                    IsBook,
                    serviceId,
                    duration,
            
                },
            });
            return res.status(201).json({ status: 201, message: 'Step 1 successful', breaks:createTimeBlock});
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process step 1' });
    } finally {
        await prisma.$disconnect();
    }
}