import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteStaffService(req: Request, res: Response) {
    const { staffId, serviceName } = req.body;
    try {
        if (!staffId || !serviceName) {
            return res.status(400).json({ status: 400, error: 'Inputs not found' });
        } else {
            // Retrieve the data to be deleted
            const serviceToDelete = await prisma.serviceStaff.findMany({
                where: {
                    staffId: staffId,
                    serviceName: serviceName
                }
            });

            // Delete the data
            await prisma.serviceStaff.deleteMany({
                where: {
                    staffId,
                    serviceName,
                }
            });

            return res.status(200).json({ status: 200, message: 'Delete successful', data: serviceToDelete });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}
