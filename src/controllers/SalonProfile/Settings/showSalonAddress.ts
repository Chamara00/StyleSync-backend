import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function ShowSalonAddresssforEdit (req: Request ,res: Response) {
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
                    line1:true,
                    line2:true,
                    city:true,
                    country:true
                }
            });
            return res.status(200).json({ status: 200, data: salonDetails,message: 'successfully display an  salon Address.'}); 
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }



}