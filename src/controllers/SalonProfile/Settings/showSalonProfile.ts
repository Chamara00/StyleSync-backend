import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ShowSalonProfileDetails (req: Request ,res: Response) {
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
                    name: true,
                    contactNo:true,
                    image:true
                }
            });
            return res.status(200).json({ status: 200, data: salonDetails,message: 'successfully display an  salon Details.'}); 
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }



}