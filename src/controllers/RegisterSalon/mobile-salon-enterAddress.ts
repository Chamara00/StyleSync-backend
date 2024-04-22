import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function enterAddressForSalon(req: Request, res: Response) {
    const { id, line1, line2, city, country } = req.body;

    try {
        if (!id || !line1 || !line2 || !city || !country) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }

        const updatedSalon = await prisma.salon.update({
            where: { id },
            data: {
                line1,
                line2,
                city,
                country
            }
        });

        return res.status(201).json({ status: 201, message: 'Enter address successful', salon: updatedSalon });
    } catch (error) {
        console.error('Error updating salon:', error);
        return res.status(500).json({ status: 500, error: 'Failed to enter address' });
    }
    finally {
        await prisma.$disconnect();
    }
}
