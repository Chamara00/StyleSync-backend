import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//3.1 view breaks

const prisma = new PrismaClient();

export async function getAppointments(req: Request, res: Response) {

    const { userId } = req.query;
    try{
        if(!userId){

            return res.status(400).json({ status: 400, error: 'salon id not found' });
        }
        const appointments = await prisma.customerAppointmentBlock.findMany ({
            where : {
                customerId:Number(userId)
            },
            select: {
                date:true,
                startTime:true,
                staffId:true,
                isCancel:true,
                isReject:true,
                appointmentBlock:{
                    select:{
                        staff:{
                            select:{
                                salonStaff:{
                                    select:{
                                        salon:{
                                            select:{
                                                name:true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        const existingAppointments = appointments.map((a)=>({
            date:a.date,
            startTime:a.startTime,
            staffId:a.staffId,
            salon:a.appointmentBlock.staff.salonStaff.map((b)=>b.salon.name),
            isCancel:a.isCancel,
            isReject:a.isReject
        }));
        return res.status(200).json({ status: 200, data: existingAppointments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}