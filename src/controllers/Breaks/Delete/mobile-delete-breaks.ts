import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//3.1 delete existing break

const prisma = new PrismaClient();

export async function deleteBreaks(req: Request, res: Response) {
    const { salonId, dayName, breakStart } = req.body;
    try {
        if (!salonId || !dayName || !breakStart) {
            return res.status(400).json({ status: 400, error: 'Inputs not found' });
        } else {
            // Retrieve the data to be deleted
            const breakToDelete = await prisma.breaks.findMany({
                where: {
                    salonId: salonId,
                    dayName: dayName,
                    breakStart: breakStart
                }
            });

            // Delete the data
            await prisma.breaks.deleteMany({
                where: {
                    salonId: salonId,
                    dayName: dayName,
                    breakStart: breakStart
                }
            });

            return res.status(200).json({ status: 200, message: 'Delete successful', data: breakToDelete });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}
