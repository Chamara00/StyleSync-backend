import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//3.1 delete existing break

const prisma = new PrismaClient();

export async function deleteStaff(req: Request, res: Response) {

    const { staffId, salonId} = req.query;

    try {
        if (!staffId || !salonId) {
            return res.status(400).json({ status: 400, error: 'Inputs not found' });
        } else {
            await prisma.salonStaff.deleteMany({
                where: {
                    salonId:Number(salonId),
                    staffID:Number(staffId)  
                }
            });
            await prisma. breaks.deleteMany({
                where: {
                    staffId:Number(staffId)  
                }
            });
            await prisma.openDays.deleteMany({
                where: {
                    staffId:Number(staffId)  
                }
            });
            await prisma.staffContact.deleteMany({
                where: {
                    staffId:Number(staffId)  
                }
            });
            await prisma.serviceStaff.deleteMany({
                where: {
                    staffId:Number(staffId)  
                }
            });
            await prisma.customerAppointmentBlock.deleteMany({
                where: {
                    staffId:Number(staffId)  
                }
            });
            await prisma.serviceAppointmentBlock .deleteMany({
                where: {
                    staffId:Number(staffId)  
                }
            });
            await prisma.appointmentBlock.deleteMany({
                where: {
                    staffId:Number(staffId)  
                }
            });
            await prisma.timeBlocks.deleteMany({
                where: {
                    staffId:Number(staffId)  
                }
            });

           
            const findstaffId = await prisma.staff.delete({
                where: {
                    id: Number(staffId),   
                },
            });
            return res.status(200).json({ status: 200, message: 'Delete successful', data: findstaffId });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}