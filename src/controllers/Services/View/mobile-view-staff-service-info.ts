import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//http://localhost:8000/app/v1/service/get-staff-service-info
//6.0 show services in chosen service type

const prisma = new PrismaClient();

export async function getServiceInfo(req: Request, res: Response) {
    const { staffId, serviceType } = req.query;
    try{
        if(!staffId || !serviceType || typeof staffId !== 'string'){
            return res.status(400).json({ status: 400, error: 'salon id not found' });
        }
        const viewService = await prisma.serviceStaff.findMany ({
            where: {
                staffId : parseInt(staffId)
            },
            select: {
                serviceId: true
            }
        });
        const existingId = viewService.map(service => service.serviceId);
        let i = 0;
        const results: unknown [] = [];
        while(existingId[i]!= null){
            const viewServiceInfo = await prisma.service.findMany({
                where: {
                    id: existingId[i],
                    serviceType: String(serviceType)
                },
                select: {
                    name: true,
                    price:true,
                    duration: true
                }
            });
            i++;
            results.push(...viewServiceInfo);
            // res.status(200).json({ status: 200, data: viewServiceInfo });
        }
        return res.status(200).json({ status: 200, data: results });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}