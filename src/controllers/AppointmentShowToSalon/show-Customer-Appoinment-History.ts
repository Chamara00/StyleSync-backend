import { Request,Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function ShowCustomerHistory(req:Request , res: Response){
    const {salonId,date,customerId,endtime} =req.query;

    try{
        if(!salonId || !date || typeof date !== 'string' || !customerId || !endtime || typeof endtime !== 'string'){
            return res.status(400).json({status:400, error: 'Invalid input format'});
        }else{
            const today = new Date(date); 
            today.setHours(0, 0, 0, 0); 
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            const findStaffId = await prisma.customerAppointmentBlock.findMany({
                
                where:{
                 OR:[
                    {
                    customerId:Number(customerId),
                    isCancel:false,
                    date:{
                        gt:today,
                        lt:endOfDay
                    },
                    appointmentBlock:{
                        isBook:true,
                        endTime:{
                            lt:endtime,
                        }
                    }
                   },
                   {
                    customerId:Number(customerId),
                    isCancel:false,
                    date:{
                        lt:today
                    },
                    appointmentBlock:{
                        isBook:true,
                    }
                   },
                ],
                },
                select:{
                    staffId:true
                },
                distinct: ['staffId']
            });
            const staffIdOfCustomerAppoinment = findStaffId.map(service => service.staffId);
            if(!staffIdOfCustomerAppoinment){
                return res.status(400).json({ status: 400, error: 'StaffId not found' });
            }
            else{
                const results: unknown [] = [];
                for (let i = 0; i < staffIdOfCustomerAppoinment.length; i++){
                    const findBlocks = await prisma.salonStaff.findMany({
                        where:{
                            salonId :Number(salonId),
                            staffID: staffIdOfCustomerAppoinment[i]
                        },
                        select:{
                            staffID:true
                        }
                    }); 
                    const staffIdOfSalon = findBlocks.map(service => service.staffID);
                    if (!staffIdOfSalon) {
                        return res.status(400).json({ status: 400, error: 'StaffId not found' });
                    }else{
                        for (let i = 0; i < staffIdOfSalon.length; i++){
                            const today = new Date(date); 
                            today.setHours(0, 0, 0, 0); 
                            const endOfDay = new Date(date);
                            endOfDay.setHours(23, 59, 59, 999);
                            const getDetails =await prisma.appointmentBlock.findMany({
                                where:{
                                OR:[
                                    {
                                    customerAppointmentBlock:{
                                        some:{
                                            customerId:Number(customerId),
                                            isCancel:false,
                                        }
                                    },
                                    staffId:staffIdOfSalon[i],
                                    date:{
                                        gt:today,
                                        lt:endOfDay
                                    },
                                    isBook:true,
                                    endTime:{
                                        lt:endtime,
                                    }  
                                },
                                {
                                    customerAppointmentBlock:{
                                        some:{
                                            customerId:Number(customerId),
                                            isCancel:false,
                                        }
                                    },
                                    staffId:staffIdOfSalon[i],
                                    date:{
                                        lt:today   
                                    },
                                    isBook:true,
                                },
                                ]
                                },
                                select:{
                                    customerAppointmentBlock:{
                                        select:{
                                           customerId:true,
                                        }                                       
                                    },
                                    date:true,
                                    serviceAppointmentBlock:{
                                        select:{
                                           service:{
                                              select:{
                                                name :true,
                                                price :true
                                              }
                                        }
                                        }
                                    }
                                }
                            });
                            results.push(...getDetails);
                        }
                    }
                }
                return res.status(200).json({ status: 200, data:results ,message: 'successfully display an  appointment.'}); 
            }
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    }finally{
        await prisma.$disconnect();
    }
}