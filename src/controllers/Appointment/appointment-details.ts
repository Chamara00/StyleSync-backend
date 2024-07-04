import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function AppointmentDetails(req: Request, res: Response) {
  const { userId, date, startTime, staffId } = req.query;
  if(!userId || !date || !startTime || !staffId){
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const setDate = new Date(String(date));
    setDate.setHours(0,0,0,0);

  try{
    const appointment = await prisma.customerAppointmentBlock.findMany({
        where: {
            customerId: Number(userId),
            date: String(date),
            startTime: String(startTime),
            staffId: Number(staffId)
        },
        select:{
            isCancel:true,
            isReject:true,
            customer:{
                select:{
                    name:true,
                    email:true,
                    contactNo:true,
                    gender:true,
                    image:true
                }
            },
            appointmentBlock:{
                select:{
                    bookingTime:true,
                    endTime:true,
                    isBook:true,
                    staff:{
                        select:{
                            name:true,
                            gender:true,
                            image:true,
                            salonStaff:{
                                select:{
                                    salon:{
                                        select:{
                                            name:true,
                                            image:true,
                                            email:true,
                                            contactNo:true,
                                            line1:true,
                                            line2:true,
                                            city:true,
                                        }
                                    }
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
                                    duration:true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    const appointmentInfo = appointment.map((a)=>({
        isCancel:a.isCancel,
        isReject:a.isReject,
        customerName: a.customer.name,
        customerImage : a.customer.image,
        customerGender: a.customer.gender,
        customerEmail: a.customer.email,
        customerContactNo: a.customer.contactNo,
        staffName: a.appointmentBlock.staff.name,
        staffImage: a.appointmentBlock.staff.image,
        staffGender: a.appointmentBlock.staff.gender,
        salonName: a.appointmentBlock.staff.salonStaff.map((b)=>(
            b.salon.name
        )),
        salonImage: a.appointmentBlock.staff.salonStaff.map((b)=>(
            b.salon.image
        )),
        salonEmail: a.appointmentBlock.staff.salonStaff.map((b)=>(
            b.salon.email
        )),
        line1: a.appointmentBlock.staff.salonStaff.map((b)=>(
            b.salon.line1
        )),
        line2: a.appointmentBlock.staff.salonStaff.map((b)=>(
            b.salon.line2
        )),
        city:a.appointmentBlock.staff.salonStaff.map((b)=>(
            b.salon.city
        )),
        serviceName:a.appointmentBlock.serviceAppointmentBlock.map((b)=>(
            b.service.name
        )),
        price:a.appointmentBlock.serviceAppointmentBlock.map((b)=>(
            b.service.price
        )),
        duration:a.appointmentBlock.serviceAppointmentBlock.map((b)=>(
            b.service.duration
        ))
    }));
    console.log(appointmentInfo);
    return res.status(200).json({status:200, message:'Successfully shown', data:appointmentInfo});
    
  }catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  } finally {
    await prisma.$disconnect();
  }
}