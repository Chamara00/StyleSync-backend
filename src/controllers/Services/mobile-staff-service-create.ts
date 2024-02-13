import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createStaffService(req: Request, res: Response) {
    const { staffId, serviceType } = req.body;
    try {
        if (!staffId || !serviceType) {
            return res.status(400).json({ status: 400, error: 'Inputs not found' });
        } else {
            // const selectedServices = [];
            for (let i = 0; i < serviceType.length; i++) {
                const services = await prisma.allServices.findMany({
                    where: {
                        serviceType: serviceType[i]
                    },
                    select: {
                        service: true,
                    }
                });
                // selectedServices.push(...services);
                const existingServiceName = services.map(service => service.service);
                for(let j =0; j < existingServiceName.length; j++ ){
                    const getStaffServices = await prisma.allServices.findMany({
                        where:{
                            service: existingServiceName[j]
                        },
                        select:{
                            serviceType:true,
                            price: true,
                            duration:true
                        }
                    });
                    const existingServiceType = getStaffServices.map(service => service.serviceType);
                    const existingPrice = getStaffServices.map(service => service.price);
                    const existingDuration = getStaffServices.map(service => service.duration);
                    prisma.service.create({
                        data: {
                            name:existingServiceName[j],
                            serviceType: existingServiceType[0],
                            price: existingPrice[0],
                            duration: existingDuration[0]
                        }
                    });
                    const getServices = await prisma.service.findMany({
                        where:{
                            name: existingServiceName[j]
                        },
                        select:{
                            id:true
                        }
                    });
                    const existingId = getServices.map(service => service.id);
                    await prisma.serviceStaff.create({
                        data: {
                            serviceId: existingId[0],
                            staffId
                        }
                    });
                }
            }
            return res.status(200).json({ status: 200, message: 'service created' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}
