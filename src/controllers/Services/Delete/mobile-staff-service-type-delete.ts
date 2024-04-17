import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteStaffServiceType(req: Request, res: Response) {
    const { staffId, serviceType } = req.query;
    try {
        if (!staffId || !serviceType || typeof staffId !== 'string') {
            return res.status(400).json({ status: 400, error: 'Inputs not found' });
        } else {
            
           const getServiceId =  await prisma.serviceStaff.findMany({
                where: {
                    staffId: parseInt(staffId),
                    //serviceId,
                },
                select: {
                    serviceId: true,
                }
            }); 

        const existingServiceId = getServiceId.map(item => item.serviceId);
        let i = 0 ;
        while(existingServiceId[i]!= null){
            await prisma.service.deleteMany({
                where:{
                    id: existingServiceId[i],
                    serviceType: String(serviceType),
                }
            });
            i++;
        }

            return res.status(200).json({ status: 200, message: 'Delete successful' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}