import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function  UpdateSalonNotification(req: Request, res: Response) {
    const {salonId, notification } = req.body;
    try{
        if (!salonId) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }else{
            const findStaffId = await prisma.salonStaff.findMany({
                where: {
                    salonId: Number(salonId)
                },
                select: {
                    staffID: true
                }
            });
            const staffIdOfSalon = findStaffId.map(service => service.staffID);
            if (!staffIdOfSalon) {
                return res.status(400).json({ status: 400, error: 'StaffId not found' });
            } else(!notification || notification);{
                for (let i = 0; i < staffIdOfSalon.length; i++){
             await prisma.staff.updateMany({
                where: {
                   id:staffIdOfSalon[i],
                },
                data: {
                    notification:notification
                }
            });
            return res.status(201).json({ status: 201,data:staffIdOfSalon , message: 'successfully update.'});
        }
    }
    }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}