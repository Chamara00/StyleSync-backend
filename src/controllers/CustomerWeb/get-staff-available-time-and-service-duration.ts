import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// function getTodayName(): string {
//     const today = new Date();
//     const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
//     const todayName = today.toLocaleDateString('en-US', options);
//     return todayName;
//   }
  

export async function StaffAvailability(req: Request, res: Response){
    const {staffId, serviceId, dayName} = req.query;
    try{
        if(!staffId || !serviceId || !dayName){
            return res.status(400).json({message: 'Please provide staffId and serviceId'});
        }
        const availableTimeDuration = await prisma.serviceStaff.findMany({
            where:{
                staffId: Number(staffId),
                serviceId: Number(serviceId)
            },
            select:{
                staff:{
                    select:{
                        openDays:{
                            where:{
                                dayName: String(dayName)
                            },
                            select:{
                                openHour:true,
                                closeHour:true,
                            }
                        }
                    }
                },
                Service:{
                    select:{
                        duration:true
                    }
                }
            }
        });
        const existingAvailableTimeAndDuration = availableTimeDuration.map((a)=>({
            openHour: a.staff.openDays.map((b)=>b.openHour),
            closeHour: a.staff.openDays.map((c)=>c.closeHour),
            duration: a.Service.duration
        }));
        return res.status(200).json({status:200,message:'Successful', data:existingAvailableTimeAndDuration});
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to get registered salons' });
      } finally {
        await prisma.$disconnect();
      }
}
