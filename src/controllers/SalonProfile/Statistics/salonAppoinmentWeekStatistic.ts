import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getWeekRange(date: string) {
    const now = new Date(date);
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek };
}

function getDatesOfWeek(startOfWeek: Date) {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        dates.push(date);
    }
    return dates;
}

export async function SalonAppointmentWeekStatistics (req: Request ,res: Response) {
    const {salonId,date} = req.query;

    try{
        if(!salonId || !date || typeof date !== 'string'){
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }else{
            const findStaffId = await prisma.salonStaff.findMany({
                where: {
                    salonId:Number(salonId) 
                },
                select: {
                    staffID: true
                }
            });
            const staffIdOfSalon = findStaffId.map(service => service.staffID);
            if(!staffIdOfSalon){
                return res.status(400).json({ status: 400, error: 'StaffId not found' });     
            }else{
                const { startOfWeek } = getWeekRange(date);
                const datesOfWeek = getDatesOfWeek(startOfWeek);
                
                const daysOfWeek = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const appointmentCounts: { [key: string]: number } = {};

                for (let i = 0; i < datesOfWeek.length; i++) {
                    const date = datesOfWeek[i];
                    const nextDate = new Date(date);
                    nextDate.setDate(date.getDate() + 1);

                const count = await prisma.appointmentBlock.count({
                    where:{
                        staffId:{
                            in:staffIdOfSalon
                        },
                        isBook:true,
                        date:{
                            gte: date,
                            lt: nextDate
                        },
                        customerAppointmentBlock:{
                            some:{
                                isCancel:false
                            }
                        }
                    },
                });
                
                appointmentCounts[daysOfWeek[date.getDay()]] = count;
            }
                return res.status(200).json({ status: 200, data: appointmentCounts,message: 'successfully display an  appointment.'});
            }
             
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}