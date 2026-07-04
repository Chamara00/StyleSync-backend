import prisma from '../../../utils/prismaClient';
import { Request, Response } from 'express';

export async function GetSalonLocation (req: Request ,res: Response) {
    const {salonId} = req.query;

    try{
        if(!salonId){
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }else{
            const salonDetails = await prisma.salon.findMany({
                where:{
                    id: Number(salonId)
                },
                select:{
                    latitude:true,
                    longtitude:true
                }
            });
            return res.status(200).json({ status: 200, data: salonDetails,message: 'Successfully Show Location.'}); 
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    }



}