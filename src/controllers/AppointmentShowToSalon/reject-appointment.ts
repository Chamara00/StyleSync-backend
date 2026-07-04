import prisma from '../../utils/prismaClient';
import { Request, Response } from 'express';
 export async function RejectAppointment(req: Request, res: Response) {
    const {customerId,date,startTime,staffId} = req.body;
    try{
        if( !customerId || !date|| !startTime || !staffId){
            return res.status(400).json({ status: 400, error: 'salon id or day name not found' });
        }
        else{
            const [rejectAppointment, isBook] = await prisma.$transaction([
                prisma.customerAppointmentBlock.updateMany({
                    where :{
                        customerId:customerId,
                        date:date,
                        startTime:startTime,
                        staffId:staffId
                    },
                    data:{
                       isReject:true
                    }
                }),
                prisma.appointmentBlock.updateMany({
                    where:{
                        date:date,
                        staffId:staffId,
                        startTime:startTime
                    },
                    data:{
                        isBook:false
                    }
                })
            ]);
            return res.status(201).json({ status: 201, message: 'Update successful', data: {rejectAppointment, isBook} });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    }
 }