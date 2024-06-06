import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SalonAppointmentTodayStatistics (req: Request ,res: Response) {
    const {salonId} = req.body;

    

    try{
        if(!salonId){
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }else{
            const findStaffId = await prisma.salonStaff.findMany({
                where: {
                    salonId: salonId
                },
                select: {
                    staffID: true
                }
            });
            const staffIdOfSalon = findStaffId.map(service => service.staffID);
            if(!staffIdOfSalon){
                return res.status(400).json({ status: 400, error: 'StaffId not found' });     
            }else{
                const ShowNoOfAppointment: { staffName: string, count: number }[] = [];
                
                for (let i = 0; i < staffIdOfSalon.length; i++) {
                    const today = new Date(); 
                    today.setHours(0, 0, 0, 0); 
                    const endOfDay = new Date();
                    endOfDay.setHours(23, 59, 59, 999);
                    const findBlocks = await prisma.appointmentBlock.findMany({
                        where:{
                            staffId: staffIdOfSalon[i],
                            isBook: true,    
                            date:{
                                gte: today, 
                                lte: endOfDay 
                            }
                        },
                        select:{
                            staff:{
                                select:{
                                    name: true
                                }
                            },
                            customerAppointmentBlock:{
                                where:{
                                    isCancel:false,
                                },
                                select:{
                                    startTime:true
                                }
                            }
                        }
                    });
                    const appointmentCount = findBlocks.reduce((acc, block) => acc + block.customerAppointmentBlock.length, 0);
                    if (findBlocks.length > 0) {
                        ShowNoOfAppointment.push({
                            staffName: findBlocks[0].staff.name,
                            count: appointmentCount
                        });
                    }
                }
                return res.status(200).json({ status: 200, data:  ShowNoOfAppointment,message: 'successfully display an  appointment.'}); 
            }
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}