import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function  ShowUpComingAppointments(req: Request, res: Response) {
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
                const  ShowUpComingAppointments: unknown [] = [];
                for (let i = 0; i < staffIdOfSalon.length; i++) {
                    const today = new Date(); 
                    today.setHours(0, 0, 0, 0); 
                    const endOfDay = new Date();
                    endOfDay.setHours(23, 59, 59, 999);
                    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }); 
                    const findBlocks = await prisma.appointmentBlock.findMany({
                        where: {
                            staffId: staffIdOfSalon[i],
                            isBook: true,
                            date: {
                                gte: today, 
                                lte: endOfDay 
                            }, 
                            startTime : {
                                gt: currentTime 
                            },
                            customerAppointmentBlock: {
                                some: {
                                    isCancel: false 
                                }
                            }   
                        },
                        select: {
                            startTime:true,
                            endTime:true,
                            staff:{
                                select:{
                                id:true,
                                name :true,
                                }
                            },
                            customerAppointmentBlock:{
                                select:{
                                    customer:{
                                        select:{
                                            name:true,
                                            gender :true,
                                        }
                                    }
                                }
                            },
                            serviceAppointmentBlock:{
                                select:{
                                service:{
                                    select:{
                                        name:true,
                                        price:true,
                                    }
                                }
                            }
                            }
                        }
                    });
                    ShowUpComingAppointments.push(...findBlocks);
                } 
                return res.status(200).json({ status: 200, data: ShowUpComingAppointments ,message: 'successfully display an  appointment.'}); 
        }  
}
}catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}
