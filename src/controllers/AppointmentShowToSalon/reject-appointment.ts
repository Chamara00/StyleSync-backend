import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
 export async function RejectAppointment(req: Request, res: Response) {
    const {customerId,date,startTime,staffId} = req.body;
    try{
        if( !customerId || !date|| !startTime || !staffId){
            return res.status(400).json({ status: 400, error: 'salon id or day name not found' });
        }
        else{
            const rejectAppointment = await  prisma.customerAppointmentBlock.updateMany({
                where :{
                    customerId:customerId,
                    date:date,
                    startTime:startTime,
                    staffId:staffId
                },
                data:{
                   isReject:true
                }
            });
            return res.status(201).json({ status: 201, message: 'Update successful', data: rejectAppointment });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
 }