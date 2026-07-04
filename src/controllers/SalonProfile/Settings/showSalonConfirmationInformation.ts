import prisma from '../../../utils/prismaClient';
import { Request, Response } from 'express';

export async function ShowSalonLogin(req: Request ,res: Response) {
    const {salonId} = req.query;

    try{
        if(!salonId){
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }else{
            const salonDetails = await prisma.salon.findUnique({
                where:{
                    id: Number(salonId)
                },
                select:{
                    email:true,
                    username:true,
                    password:true
                }
            });
            return res.status(200).json({ status: 200, data: salonDetails,message: 'successfully display an  salon Address.'}); 
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    }



}