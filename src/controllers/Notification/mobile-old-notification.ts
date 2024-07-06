import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function  OldNotification(req: Request, res: Response) {
    const { salonId,date } = req.query;
    try {
        if (!salonId || !date) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        } else {
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
            } else {
                const  GetOldNotification: unknown [] = [];
                for (let i = 0; i < staffIdOfSalon.length; i++) {
                    const selectedDate = new Date(String(date)); 
                    selectedDate.setHours(0, 0, 0, 0); 

                    const threeDaysBefore = new Date(selectedDate);
                    threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);
                    threeDaysBefore.setHours(0, 0, 0, 0);

                    const findBlocks = await prisma.appointmentBlock.findMany({
                        where: {
                            staffId: staffIdOfSalon[i],
                            isBook: true,
                            bookingTime : {
                                gte: threeDaysBefore, 
                                lte: selectedDate 
                            }, 
                        },
                        select: {
                            startTime:true,
                            endTime:true,
                            bookingTime:true,
                            staff:{
                                select:{
                                id:true,
                                notification:true,
                                name :true,
                                image:true,
                                salonStaff:{
                                    select:{
                                        salonId:true
                                    }
                                }
                                }
                            },
                            customerAppointmentBlock:{
                                select:{
                                    isCancel:true,
                                    isReject:true,
                                    startTime:true,
                                    customerId:true,
                                    date:true,
                                    customer:{
                                        select:{
                                            name:true,
                                            gender :true,
                                            image:true
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
                    GetOldNotification.push(...findBlocks);
                } 
                return res.status(200).json({ status: 200, data:  GetOldNotification,message: 'successfully display notifications.'}); 
        }  
}
}catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}
