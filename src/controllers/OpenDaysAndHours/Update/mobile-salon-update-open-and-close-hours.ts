import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//3.1 update open days and hours


const prisma = new PrismaClient();
 export async function updateOpenHours(req: Request, res: Response) {
    const {staffId, dayName, openHour, closeHour, isOpen} = req.body;
    try{
        if(!staffId || !dayName){
            return res.status(400).json({ status: 400, error: 'salon id or day name not found' });
        }
        else if(isOpen && (!openHour || !closeHour)){
            return res.status(400).json({ status: 400, error: 'open or close hour not found' });
        }
        else if(!isOpen){
            await prisma.openDays.updateMany({
                where: {
                    staffId: staffId,
                    dayName: dayName
                },
                data:{
                    isOpen: isOpen
                }
            });
            return res.status(201).json({ status: 201, message: 'Update successful' });
        }
        else{
            await prisma.openDays.updateMany({
                where: {
                    staffId: staffId,
                    dayName: dayName
                },
                data: {
                    isOpen: isOpen,
                    openHour : openHour,
                    closeHour: closeHour
                }
            });
            return res.status(201).json({ status: 201, message: 'Update successful' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
 }

