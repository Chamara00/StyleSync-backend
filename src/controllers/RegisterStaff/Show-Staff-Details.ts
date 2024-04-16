import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ShowStaffDetails(req: Request, res: Response) {
    const { salonId } = req.body;
    try {
        if (!salonId) {
            return res.status(400).json({ status: 400, error: 'SalonId not found' });
        } else {
            const findStaffId = await prisma.salonStaff.findMany({
                where: {
                    salonId: salonId
                },
                select: {
                    staffID: true
                }
            });
            const staffIdOfSalon = findStaffId.map(service => service.staffID);
            if (!staffIdOfSalon) {
                return res.status(400).json({ status: 400, error: 'StaffId not found' });
            } else {
                const resultsTwo: unknown [] = [];
                for (let i = 0; i < staffIdOfSalon.length; i++) {
                    const findBlocks = await prisma.staff.findMany({
                        where: {
                            id: staffIdOfSalon[i],
                        },
                        select: {
                           name:true,
                           gender:true,
                           staffContact:{
                                select:{
                                    contactNo:true
                                }
                           }
                           
                           
                        }
                    });
                    resultsTwo.push(...findBlocks);
                } 
                return res.status(200).json({ status: 200, data:resultsTwo ,message: 'successfully display an  appointment.'}); 
        }// salon id for loop   
}//first else
}catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}
