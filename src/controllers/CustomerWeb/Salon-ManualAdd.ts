import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SalonAddManual(req: Request, res: Response) {
    try {
        const { name, email,location,line1,line2,city,country,contactNo } = req.body;

        if (!email || !name) {
            return res.status(400).json({ status: 400, error:'Email and the salon name is required' });
        }

        const existingSalon = await prisma.salon.findUnique({
            where: {
                email,
            },
        });

        if (existingSalon) {
            return res.status(400).json({ status: 400, error: 'Email address Cannot be used' });
        }

        await prisma.salon.create({
            data: {
                name,
                email,
                location,
                line1,
                line2,
                city,
                country,
                contactNo,
                

            },
        });

        return res.status(201).json({ status: 201, message: 'Salon added successful' });


    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to login' });
    } finally {
        await prisma.$disconnect();
    }
}