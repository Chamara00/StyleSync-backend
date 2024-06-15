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

    export async function getCustomerById(req: Request, res: Response) {
        const { id } = req.params;
    
        if (!id) {
            return res.status(400).json({ status: 400, error: 'Customer ID is required' });
        }
    
        try {
            const customer = await prisma.customer.findUnique({
                where: { id: Number(id) },
                select: {
                    id: true,
                    name: true,
                    gender: true,
                    email: true,
                    review: true,
                    customerAppointmentBlock: true,
                },
            });
    
            if (!customer) {
                return res.status(404).json({ status: 404, error: 'Customer not found' });
            }
    
            res.status(200).json({ customerData: customer });
        } catch (error) {
            console.error('Error fetching customer by ID:', error);
            return res.status(500).json({ status: 500, error: 'Failed to get customer data' });
        } finally {
            await prisma.$disconnect();
        }
    }