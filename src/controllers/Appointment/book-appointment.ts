import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function  BookAppointment(req: Request, res: Response){
    const {userId,date, bookingTime,startTime,endTime,staffId,serviceId} = req.body;
    try{
        const appointment = await prisma.appointmentBlock.create({
            data:{
                date:date,
                bookingTime:bookingTime,
                startTime:startTime,
                endTime:endTime,
                isBook:true,
                staffId:staffId,
                customerAppointmentBlock:{
                    create:{
                        customerId:userId,
                        isCancel: false,
                        isReject:false
                    }
                },
                serviceAppointmentBlock:{
                    create:{
                        serviceId:serviceId,
                    }
                }
                }
        });
        const customerAppointment = await prisma.customerAppointmentBlock.create({
            data:{
                customerId:userId,
                date:date,
                startTime:startTime,
                staffId:staffId,
                isCancel:false,
                isReject:false,
            }
        });
        const serviceAppointment = await prisma.serviceAppointmentBlock.create({
            data:{
                serviceId:serviceId,
                date:date,
                startTime:startTime,
                staffId:staffId
            }
        });

        return res.status(200).json({status:200, message:'Successfull',data:{appointment,customerAppointment,serviceAppointment}});
    }catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  } finally {
    await prisma.$disconnect();
  }
}