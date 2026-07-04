import prisma from '../../../utils/prismaClient';
import { Request, Response } from 'express';
//3.1 delete existing break


export async function deleteBreaks(req: Request, res: Response) {

    const { staffId, dayName, breakStart } = req.query;

    try {
        if (!staffId || !dayName || !breakStart || typeof staffId !== 'string') {
            return res.status(400).json({ status: 400, error: 'Inputs not found' });
        } else {
            // Retrieve the data to be deleted
            const breakToDelete = await prisma.breaks.findMany({
                where: {

                    staffId: parseInt(staffId),
                    dayName: String(dayName),
                    breakStart: String(breakStart)
                }
            });

            // Delete the data
            await prisma.breaks.deleteMany({
                where: {

                    staffId: parseInt(staffId),

                    dayName: String(dayName),
                    breakStart: String(breakStart)
                }
            });

            return res.status(200).json({ status: 200, message: 'Delete successful', data: breakToDelete });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    }
}
