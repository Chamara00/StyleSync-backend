import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function FirstPage(req: Request, res: Response) {
    try {
        // Fetch the unique service names along with the count of salons providing each service
        const servicesWithSalonCounts = await prisma.service.findMany({
            select: {
                name: true,
                serviceStaff: {
                    select: {
                        staff: {
                            select: {
                                salonStaff: {
                                    select: {
                                        salonId: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        // Process the results to get the count of unique salons per service
        const results = servicesWithSalonCounts.map(service => {
            const uniqueSalonIds = new Set<number>();
            service.serviceStaff.forEach(serviceStaff => {
                serviceStaff.staff.salonStaff.forEach(salonStaff => {
                    uniqueSalonIds.add(salonStaff.salonId);
                });
            });
            return {
                serviceName: service.name,
                salonCount: uniqueSalonIds.size
            };
        });

        return res.status(200).json({ status: 200, data: results });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Error' });
    } finally {
        await prisma.$disconnect();
    }
}

