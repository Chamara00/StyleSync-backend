import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ShowSalonDetails (req: Request ,res: Response) {
    const {salonId, date} = req.query;

    try{
        if (!salonId || !date || typeof date !== 'string') {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }else{
           
            // Fetch the salon details 
                const givenDate = new Date(date);
                const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(givenDate);
                const salonDetails = await prisma.salon.findUnique({
                    where: {
                        id: Number(salonId),
                    },
                    select: {
                        name: true,
                        line1: true,
                        line2: true,
                        city: true,
                        country: true,
                    },
                });
                
                 // Fetch the staff details and their open hours for the given day
                const staffDetails= await prisma.salonStaff.findMany({
                    where: {
                        salonId: Number(salonId)
                    },
                    select: {
                        staffID: true,
                        staff:{
                            select:{
                                name: true,
                                openDays:{
                                    where:{
                                        dayName:dayOfWeek,
                                    },
                                    select:{
                                        openHour: true,
                                        closeHour:true,
                                    }
                                }
                            }                            
                        }  
                    }
                });

                // Filter out staff where openHour or closeHour is null
                const filteredStaffDetails = staffDetails.filter(staff => {
                return staff.staff.openDays.every(day => day.openHour !== null && day.closeHour !== null);
            });

                // Count the number of staff members
                const staffCount = await prisma.salonStaff.count({
                where: {
                    salonId: Number(salonId),
                },
            });
                 // Count the number of customer
                 const staffIds = filteredStaffDetails.map(staff => staff.staffID);
                 const customerCount = await prisma.customerAppointmentBlock.findMany({
                    where: {
                        appointmentBlock:{
                            staffId: {
                                in: staffIds,
                            },
                        },
                        isCancel:false,
                    },
                    select:{
                        customerId:true
                    },
                    distinct: ['customerId']
                }).then(results => results.length);

                const response = {
                    salon: salonDetails,
                    staffCount: staffCount,
                    customerCount:customerCount,
                    staff: filteredStaffDetails.map(staff => ({
                        staffID: staff.staffID,
                        name: staff.staff.name,
                        openDays: staff.staff.openDays,
                    })),
                };
            
                
                return res.status(200).json({ status: 200, data:response  , message: 'successfully display an  appointment.'});
            }
           
        }
    
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}