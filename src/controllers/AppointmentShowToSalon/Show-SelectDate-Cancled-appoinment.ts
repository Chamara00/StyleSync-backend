import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function  ShowSelectDateCancleAppointments(req: Request, res: Response) {
    const { salonId,date } = req.body;
    try {
        if (!salonId || !date) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
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
                const ShowSelectDateCancleAppointments: unknown [] = [];
                for (let i = 0; i < staffIdOfSalon.length; i++) {
                    const selectedDate = new Date(date); // Get today's date and time
                    selectedDate.setHours(0, 0, 0, 0); // Set time to midnight
                    const findBlocks = await prisma.appointmentBlock.findMany({
                        where: {
                            staffId: staffIdOfSalon[i],
                            isBook: true,
                            date: {
                                gte: selectedDate, // Filter by today or later
                            }, 
                            customerAppointmentBlock: {
                                some: {
                                    isCancel: true // At least one related customerAppointmentBlock should not be cancelled
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
                    ShowSelectDateCancleAppointments.push(...findBlocks);
                } 
                return res.status(200).json({ status: 200, data:  ShowSelectDateCancleAppointments,message: 'successfully display an  appointment.'}); 
        }  
}
}catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}
