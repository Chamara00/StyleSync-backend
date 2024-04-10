import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//3.1 view breaks

const prisma = new PrismaClient();

export async function getBreaks(req: Request, res: Response) {
    const { staffId, dayName } = req.body;
    try{
        if(!staffId || !dayName){
            return res.status(400).json({ status: 400, error: 'salon id not found' });
        }
        const viewBreaks = await prisma.breaks.findMany ({
            where : {
                staffId : staffId,
                dayName : dayName
            },
            select: {
                breakStart:true,
                breakEnd:true
            }
        });
        return res.status(200).json({ status: 200, data: viewBreaks });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}