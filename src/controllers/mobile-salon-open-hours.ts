import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateOpenHours(req: Request, res: Response) {

    const { salonId, dayName ,isOpen, openHour, closeHour  } = req.body;

    try{
        if(!salonId || !dayName || !openHour || !closeHour){
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }
        const updateOpenClose = await prisma.openDays.create({
            data: {
                salonId,
                dayName,
                isOpen,
                openHour,
                closeHour,
            },
        });
        return res.status(201).json({ status: 201, message: 'Step 1 successful', openDays: updateOpenClose });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process step 1' });
    } finally {
        await prisma.$disconnect();
    }
    // const scheduleToUpdate = weeklySchedule.find(item => item.day === day);
    // if (scheduleToUpdate) {
    //     scheduleToUpdate.isOpen = true;
    //     scheduleToUpdate.openHour = openHour;
    //     scheduleToUpdate.closeHour = closeHour;
    // }
}