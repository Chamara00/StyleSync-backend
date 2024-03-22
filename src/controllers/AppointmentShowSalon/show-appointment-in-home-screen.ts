import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ShowAvailableAppointments(req: Request, res: Response) {
    const { salonId } = req.body;
    try {
        if (!salonId) {
            return res.status(400).json({ status: 400, error: 'Inputs not found' });
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
                    const today = new Date(); // Get today's date
                    const todayDateString = today.toISOString().split('T')[0]; // Convert to string in format 'YYYY-MM-DD'
                    const findBlocks = await prisma.timeBlocks.findMany({
                        where: {
                            staffId: staffIdOfSalon[i],
                            IsBook: true,
                            date: todayDateString // Filter by today's date
                        },
                        select: {
                            id:        true,
                            StartTime: true,
                            EndTime:   true,
                            staffIdGet:{
                                    select:{
                                        name:true,
                                        }
                                    },
                            service:{
                                    select:{
                                        name:true,
                                        price:true
                                        }
                                    },
                            appointment:{
                                    where:{
                                        isCancle: false
                                        },
                                    select:{
                                        id:true,
                                        customer:{
                                            select:{
                                            name:true,
                                                }
                                            }
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
