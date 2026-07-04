import prisma from '../../../utils/prismaClient';
import { Request, Response } from 'express';
//3.1 view breaks


export async function getBreaks(req: Request, res: Response) {

    const { staffId, dayName } = req.query;
    try{
        if(!staffId || !dayName || typeof staffId !== 'string'){

            return res.status(400).json({ status: 400, error: 'salon id not found' });
        }
        const viewBreaks = await prisma.breaks.findMany ({
            where : {

                staffId : parseInt(staffId),
                dayName : String(dayName)

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
    }
}