import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//5.0 show service type staff member chosen

const prisma = new PrismaClient();

export async function getStaffServiceType(req: Request, res: Response) {
    const { staffId } = req.query;
    try{
        if(!staffId || typeof staffId !== 'string' ){
            return res.status(400).json({ status: 400, error: 'salon id not found' });
        }
        const getServiceName = await prisma.serviceStaff.findMany ({
            where: {
                staffId : parseInt(staffId)
            },
            select: {
                serviceId: true
            }
        });
        const getServiceType: unknown[] = [];
        const existingServiceId = getServiceName.map(service => service.serviceId);
        let i =0;
        while(existingServiceId[i]!=null){
            const viewServiceType = await prisma.service.findMany({
                where: {
                    id: existingServiceId[i]
                },
                select: {
                    serviceType: true
                }
            });
            getServiceType.push(...viewServiceType.map(x => x.serviceType));
            i++;
        }
        const uniqueServiceTypes = removeDuplicatesUsingSet(getServiceType);
        return res.status(200).json({ status: 200, data: uniqueServiceTypes});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}

function removeDuplicatesUsingSet<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}