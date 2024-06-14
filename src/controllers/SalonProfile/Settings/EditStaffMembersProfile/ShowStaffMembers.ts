import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ShowSalonStaffMenbers(req: Request ,res: Response) {
    const {salonId, date} = req.query;

    try{
        if (!salonId || !date || typeof date !== 'string') {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }else{
            const givenDate = new Date(date);
            const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(givenDate);

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

            return res.status(200).json({ status: 200, data:staffDetails  , message: 'successfully fetch data.'});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}