import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllCustomers(req: Request, res: Response) {
    try {
        const customers = await prisma.customer.findMany ({
            select: {
                id: true,
                name: true,
                gender: true,
                email: true,
                review: true,
                customerAppointmentBlock: true,
            }
        });
        res.status(200).json({ customerData : customers});
        }
        catch (error) {
            console.error('Error', error);
            return res.status(500).json({ status: 500, error: 'Failed to get customer data' });
        }
        finally {
            await prisma.$disconnect();
        }

    }
    