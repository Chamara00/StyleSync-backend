import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SelectSalon(req: Request, res: Response) {
    try {
        const { salonId } = req.body; // Assuming the frontend sends the salonId when selecting a salon
        
        if (!salonId) {
            return res.status(400).json({ status: 400, error: 'Salon ID is required' });
        }

        const salon = await prisma.salon.findUnique({
            where: {
                id: salonId,
            },
            include: {
                salonStaff: {
                    include: {
                        staff: {
                            include: {
                                serviceStaff: {
                                    include: {
                                        Service: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!salon) {
            return res.status(404).json({ status: 404, error: 'Salon not found' });
        }

        // Extracting required details from the salon object
        const { name, contactNo, location, line1, line2, salonStaff } = salon;

        // Extracting staff names
        const staffNames = salonStaff.map((staffMember) => staffMember.staff.name);

        // Extracting service names and prices
        const services = salonStaff.flatMap((staffMember) =>
            staffMember.staff.serviceStaff.map((serviceStaff) => ({
                name: serviceStaff.Service.name,
                price: serviceStaff.Service.price,
            }))
        );

        // Removing duplicate services if the same service is offered by multiple staff members
        const uniqueServices = Array.from(new Map(services.map(service => [service.name, service])).values());

        // Constructing the response object
        const responseData = {
            name,
            contactNo,
            location,
            line1,
            line2,
            staffNames,
            services: uniqueServices,
        };

        return res.status(200).json({ status: 200, data: responseData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Failed to process salon details' });
    } finally {
        await prisma.$disconnect();
    }
}
