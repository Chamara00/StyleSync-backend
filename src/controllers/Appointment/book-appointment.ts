import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function  BookAppointment(req: Request, res: Response){
    const {userId,date,startTime,endTime,staffId,serviceId} = req.body;
    try{
        const appointment = await prisma.appointmentBlock.create({
            data:{
                date:date,
                startTime:startTime,
                endTime:endTime,
                isBook:true,
                staffId:staffId,
                customerAppointmentBlock:{
                    create:{
                        customerId:userId,
                        isCancel: false
                    }
                },
                serviceAppointmentBlock:{
                    create:{
                        serviceId:serviceId,
                    }
                }
                }
        });

        return res.status(200).json({status:200, message:'Successfull',data:appointment});
    }catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  } finally {
    await prisma.$disconnect();
  }
}