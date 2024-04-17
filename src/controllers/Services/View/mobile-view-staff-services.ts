import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServiceType(req: Request, res: Response) {
    const { staffId, serviceType } = req.query;
    try{
        if(!staffId || !serviceType || typeof staffId !== 'string'){
            return res.status(400).json({ status: 400, error: 'salon id not found' });
        }
        const viewService = await prisma.service.findMany ({
           where:{
            serviceType: String(serviceType),
           },
           select:{
            serviceStaff: {
                where: {
                    staffId: parseInt(staffId)
                },
                select :{
                    serviceId: true
                }
            }
           }
        });
        //const existingServiceId = viewService.map(item =>item.serviceStaff);
        return res.status(200).json({ status: 200, data: viewService });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}