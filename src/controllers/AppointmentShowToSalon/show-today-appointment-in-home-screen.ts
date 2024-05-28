import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ShowAvailableAppointments(req: Request, res: Response) {
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
                    const today = new Date(); // Get today's date and time
                    today.setHours(0, 0, 0, 0); // Set time to midnight
                    const endOfDay = new Date();
                    endOfDay.setHours(23, 59, 59, 999);
                    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }); // Get current time in 24-hour format (HH:MM)
                    const findBlocks = await prisma.appointmentBlock.findMany({
                        where: {
                            staffId: staffIdOfSalon[i],
                            isBook: true,
                            date: {
                                gte: today, // Filter by today 
                                lte: endOfDay 
                            }, 
                            endTime : {
                                gt: currentTime // End time should be greater than current time
                            },
                            customerAppointmentBlock: {
                                some: {
                                    isCancel: false // At least one related customerAppointmentBlock should not be cancelled
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
                    resultsTwo.push(...findBlocks);
                } 
                return res.status(200).json({ status: 200, data:resultsTwo ,message: 'successfully display an  appointment.'}); 
        }  
}
}catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}
