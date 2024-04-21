import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteStaffService(req: Request, res: Response) {
    const { staffId, serviceId } = req.query;
    try {
        if (!staffId || !serviceId || typeof serviceId !== 'string') {
            return res.status(400).json({ status: 400, error: 'Inputs not found' });
        } else {
            
            await prisma.serviceStaff.deleteMany({
                where: {
                    serviceId: parseInt(serviceId)
                    //serviceId,
                }
            });
            // Retrieve the data to be deleted
            const findServiceId = await prisma.service.delete({
                where: {
                    id: parseInt(serviceId),
                    //id: serviceId,
                },
            });

            return res.status(200).json({ status: 200, message: 'Delete successful', data: findServiceId });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}