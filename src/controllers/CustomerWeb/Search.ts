import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SearchSalon(req: Request, res: Response) {
    const { field1, date, gender, ServiceName } = req.body;

    try {
        if (!field1 && !date && !gender && !ServiceName) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }

        const salons = await prisma.salon.findMany({
            where: {
                OR: [
                    { name: { contains: field1, mode: 'insensitive' } },
                    { location: { contains: field1, mode: 'insensitive' } }
                ]
            },
            select: {
                name: true,
                location: true,
                line1: true,
                line2: true,
                city: true,
                country: true,
                review: true
            }
        });



        return res.status(200).json({ status: 200, data: salons });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process search result' });
    } finally {
        await prisma.$disconnect();
    }
}
