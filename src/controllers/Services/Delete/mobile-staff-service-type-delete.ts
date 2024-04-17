import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteStaffServiceType(req: Request, res: Response) {
    const { staffId, serviceType } = req.query;
    try {
        if (!staffId || !serviceType ) {
            return res.status(400).json({ status: 400, error: 'Inputs not found' });
        } else {
            
            await prisma.service.deleteMany({
                where: {
                    serviceType: String(serviceType)
                    //serviceId,
                }
            });
            // Retrieve the data to be deleted

            return res.status(200).json({ status: 200, message: 'Delete successful' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}