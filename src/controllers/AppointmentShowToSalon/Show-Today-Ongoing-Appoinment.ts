import { Request,Response  } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ShowOngoingAppointments(req:Request,res:Response){
    const { salonId,date,time } = req.query;
        try{
            if (!salonId ||!date  || typeof date !== 'string'|| !time ||  typeof time !== 'string') {
                return res.status(400).json({ status: 400, error: 'Invalid input format' });
            }
            else{
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
                    const ShowOngoingAppointment: unknown [] = [];
                    for (let i = 0; i < staffIdOfSalon.length; i++) {
                        // const today = new Date(); 
                        // today.setHours(0, 0, 0, 0); 
                        //const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }); 
                        const findBlocks = await prisma.appointmentBlock.findMany({
                            where: {
                                staffId: staffIdOfSalon[i],
                                isBook: true,
                                date:date,
                                startTime: { 
                                    lt: time 
                                } ,
                                endTime : {
                                    gt: time
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
                                        startTime:true,
                                        customerId:true,
                                        date:true,
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
                        ShowOngoingAppointment.push(...findBlocks);
                    } 
                    return res.status(200).json({ status: 200, data:ShowOngoingAppointment ,message: 'successfully display an  appointment.'}); 
            }  
            }

        }catch(error){
            console.log(error);
            return res.status(500).json({ status: 500, error: 'Failed to process' });
        }finally {
            await prisma.$disconnect();
        }
}