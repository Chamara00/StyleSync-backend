// Salon registration enter address for mobile app

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function enterAddressForSalon(req: Request, res: Response) {
    const { id, line1, line2, city, country } = req.body;

    try {
        if (!id || !line1 || !line2 || !city || !country) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }

        prisma.salon.update({
            where: { id },
            data: {
                line1,
                line2,
                city,
                country
            }
        });

        return res.status(201).json({ status: 201, message: 'Enter address successful', id});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to enter address' });
    }
    finally{
        prisma.$disconnect;
    }
}
