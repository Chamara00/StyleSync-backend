import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ShowCustomerDetails(req: Request, res: Response){
    const { salonId,customerId  } = req.body;
    try{
        if (!salonId || !customerId) {
            return res.status(400).json({ status: 400, error: 'Input not found' });
        }else{
            const findStaffId = await prisma.customerAppointmentBlock.findMany({
                where: {
                    customerId: customerId
                },
                select: {
                    staffId : true
                },
                distinct: ['staffId']
            });
            const staffIdOfCustomerAppoinment = findStaffId.map(service => service.staffId);
            if (!staffIdOfCustomerAppoinment) {
                return res.status(400).json({ status: 400, error: 'StaffId not found' });
            }else{
                const resultsTwo: unknown [] = [];
                for (let i = 0; i < staffIdOfCustomerAppoinment.length; i++){
                    const findBlocks = await prisma.salonStaff.findMany({
                        where:{
                            salonId :salonId,
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
                            const today = new Date(); // Get today's date and time
                            today.setHours(0, 0, 0, 0); // Set time to midnight
                            const getDetails =await prisma.appointmentBlock.findMany({
                                where:{
                                    staffId : staffIdOfSalon[i],
                                    customerAppointmentBlock: {
                                        some:{
                                          customerId :customerId
                                        }
                                    },
                                    date: {
                                        lte: today, // Filter by today or later
                                    }, 
                                },
                                select:{
                                    date:true,
                                    staffId:true,
                                    serviceAppointmentBlock:{
                                        select:{
                                           service:{
                                              select:{
                                                name :true,
                                                price :true
                                              }
                                        }
                                        }
                                    },
                                    customerAppointmentBlock:{
                                        select:{
                                            customer:{
                                                select:{
                                                    name:true,
                                                    gender :true,
                                                }
                                            }
                                        }
                                    },
                                }
                            });
                            resultsTwo.push(...getDetails);
                        }
                    } 
                       
                }

 return res.status(200).json({ status: 200, data:resultsTwo ,message: 'successfully display an  appointment.'}); 
                  
               
            }
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}