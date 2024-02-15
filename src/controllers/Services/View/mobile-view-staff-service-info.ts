import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//http://localhost:8000/app/v1/service/get-staff-service-info
//6.0 show services in chosen service type

const prisma = new PrismaClient();

export async function getServiceInfo(req: Request, res: Response) {
    const { staffId, serviceType } = req.body;
    try{
        if(!staffId || !serviceType){
            return res.status(400).json({ status: 400, error: 'salon id not found' });
        }
        const viewService = await prisma.serviceStaff.findMany ({
            where: {
                staffId : staffId
            },
            select: {
                serviceId: true
            }
        });
        const existingId = viewService.map(service => service.serviceId);
        let i = 0;
        while(existingId[i]!= null){
            const viewServiceInfo = await prisma.service.findMany({
                where: {
                    id: existingId[i]
                },
                select: {
                    name: true,
                    serviceType: true,
                    price:true,
                    duration: true
                }
            });
            i++;
            const existingServiceType = viewServiceInfo.map(service => service.serviceType);
            // if(existingServiceType===serviceType){
            //     res.status(200).json({ status: 200, data: viewServiceInfo });
            // }
        }
        return res.status(200).json({ status: 200});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}