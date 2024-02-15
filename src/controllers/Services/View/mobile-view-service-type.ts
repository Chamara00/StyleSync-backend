import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//4.0 show all the services
//http://localhost:8000/app/v1/service/get-all-service-type

const prisma = new PrismaClient();

export async function getAllServiceType(req: Request, res: Response) {
    const { staffId } = req.body;
    try {
        if (!staffId) {
            return res.status(400).json({ status: 400, error: 'salon id not found' });
        }
        const viewServiceType = await prisma.allServices.findMany({
            select: {
                serviceType: true
            }
        });

        // Remove duplicates from viewServiceType array
        const uniqueServiceTypes = removeDuplicatesUsingSet(viewServiceType.map(service => service.serviceType));

        return res.status(200).json({ status: 200, data: uniqueServiceTypes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}

// Function to remove duplicates using Set
function removeDuplicatesUsingSet<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}
