import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function  salonNotificationAvailability(req: Request, res: Response) {
    const { salonId} = req.query;

    try{
        if (!salonId) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }else{
            const NotificationCount = await prisma.salonStaff.count({
                where: {
                    salonId: Number(salonId),
                    staff :{
                        OR: [
                            { notification: true },
                            { notification: null }
                        ]
                    }
                },
            });
            return res.status(200).json({ status: 200, data:  NotificationCount,message: 'successfully get Notification.'});  
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }

}