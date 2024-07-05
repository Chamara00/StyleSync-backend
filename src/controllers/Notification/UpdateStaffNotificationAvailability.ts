import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function  UpdateStaffNotificationAvailability(req: Request, res: Response) {
    const {Id, notification } = req.body;
    try{
        if (!Id) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }else(!notification || notification) ;{
             await prisma.staff.updateMany({
                where: {
                   id:Id 
                },
                data: {
                    notification:notification
                }
            });
            return res.status(200).json({ status: 201, message: 'successfully display an  appointment.'});
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}