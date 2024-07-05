import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function  getStaffNotificationAvailability(req: Request, res: Response) {
    const {Id } = req.query;
    try{
        if(!Id){
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }else{
            const notification = await prisma.staff.findUnique({
                where:{
                    id: Number(Id)
                },
                select:{
                   id:true,
                   notification:true
                }
            });
            return res.status(200).json({ status: 200, data: notification,message: 'successfully display.'}); 
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}