import { Request,Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function ShowCustomerHistory(req:Request , res: Response){
    const {salonId,date,customerId,endtime} =req.query;

    try{
        if(!salonId || typeof salonId !== 'string'){
            return res.status(400).json({status:400, error: 'SalonId not found'});
        }
        if(!date || typeof date !== 'string'){
            return res.status(400).json({status:400, error:'date is not found'});
        }
        if(!customerId || typeof customerId !== 'string'){
            return res.status(400).json({status:400, error: 'customerId is not found'});
        }
        if(!endtime || typeof endtime !== 'string'){
            return res.status(400).json({status:400, error:'endtime is not found'});
        }
        else{
                const endOfDay = new Date(date);
                endOfDay.setHours(23, 59, 59, 999);
            const findStaffId = await prisma.customerAppointmentBlock.findMany({
                
                where:{
                    customerId:Number(customerId),
                    isCancel:false,
                    date:{
                        lt:endOfDay
                    },
                    appointmentBlock:{
                        isBook:true,
                        endTime:{
                            lt:endtime,
                        }
                    }
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
                            const endOfDay = new Date(date);
                            endOfDay.setHours(23, 59, 59, 999);
                            const getDetails =await prisma.appointmentBlock.findMany({
                                where:{
                                    customerAppointmentBlock:{
                                        some:{
                                            customerId:Number(customerId)
                                        }
                                    },
                                    staffId:staffIdOfSalon[i],
                                    date:{
                                        lt:endOfDay
                                    },
                                    endTime:{
                                        lt:endtime,
                                    }  
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