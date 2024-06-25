import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteStaffServiceType(req: Request, res: Response) {
    const { staffId, serviceType } = req.query;
    try {
        if (!staffId || !serviceType || typeof staffId !== 'string') {
            return res.status(400).json({ status: 400, error: 'Invalid inputs' });
        } else {
            const getServiceIds = await prisma.serviceStaff.findMany({
                where: {
                    staffId: parseInt(staffId)
                },
                select: {
                    serviceId: true,
                }
            });

            const serviceIds = getServiceIds.map(item => item.serviceId);

            for (const id of serviceIds) {
                const service = await prisma.service.findFirst({
                    where: {
                        id,
                        serviceType: String(serviceType),
                    }
                });

                if (service) {
                    await prisma.serviceStaff.deleteMany({
                        where: {
                            serviceId: id
                        }
                    });

                    await prisma.service.delete({
                        where: {
                            id
                        }
                    });
                }
            }

            return res.status(200).json({ status: 200, message: 'Deletion successful' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}
