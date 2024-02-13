import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createStaffService(req: Request, res: Response) {
    const { staffId, serviceType } = req.body;
    try {
        if (!staffId || !serviceType) {
            return res.status(400).json({ status: 400, error: 'Inputs not found' });
        } else {
            const selectedServices = [];
            for (let i = 0; i < serviceType.length; i++) {
                const services = await prisma.allServices.findMany({
                    where: {
                        serviceType: serviceType[i]
                    },
                    select: {
                        service: true,
                        price: true,
                        duration: true
                    }
                });
                selectedServices.push(...services);
                const existingServiceName = services.map(service => service.service);
                const existingServicePrice = services.map(service => service.price);
                const existingServiceDuration = services.map(service => service.duration);
                const staffServices = await prisma.service.create({
                    data:{
                        name: existingServiceName
                    }
                });
            }
            return res.status(200).json({ status: 200, data: selectedServices });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}
