import { Request as ExpressRequest, Response } from 'express';
import { PrismaClient } from '@prisma/client';

// Define a new interface that extends Express's Request interface
interface RequestWithSession extends ExpressRequest {
    session: {
        customerId?: number; // Assuming customerId is a number
    };
}

const prisma = new PrismaClient();

export async function AppointmentSchedule(req: RequestWithSession, res: Response) {
    try {
        const { salonId } = req.body; // Assuming the frontend sends the salonId when selecting a salon

        if (!salonId) {
            return res.status(400).json({ status: 400, error: 'Salon ID is required' });
        }

        // Check if the customer is logged in
        const customerId = req.session.customerId; // Access customerId from session

        let customerData = {}; // Initialize an empty object to store customer data

        if (customerId) {
            // If customerId exists, fetch customer details
            const customer = await prisma.customer.findUnique({
                where: {
                    id: customerId,
                },
                select: {
                    name: true,
                    email: true,
                },
            });

            if (customer) {
                // If customer details are found, store them in customerData
                customerData = {
                    name: customer.name,
                    email: customer.email,
                };
            }
        }

        const salon = await prisma.salon.findUnique({
            where: {
                id: salonId,
            },
            include: {
                salonStaff: {
                    include: {
                        staff: true,
                    },
                },
                //service: true,
            },
        });

        if (!salon) {
            return res.status(404).json({ status: 404, error: 'Salon not found' });
        }

        // Extracting required details from the salon object
        const { name, contactNo, location, line1, line2 } = salon;

        // Constructing the response object
        const responseData = {
            name,
            contactNo,
            location,
            line1,
            line2,
            customer: customerData, // Include customer data in the response
        };

        return res.status(200).json({ status: 200, data: responseData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process salon details' });
    } finally {
        await prisma.$disconnect();
    }
}
