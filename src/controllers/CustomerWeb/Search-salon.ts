import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function Home(req: Request, res: Response) {
    const { name, location, date, gender, ServiceName } = req.body;

    try {
        if (!name && !location && !date && !gender && !ServiceName) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }

        let salons;

        if (name) {
            salons = await prisma.salon.findMany({
                where: {
                    name: {
                        contains: name,
                        mode: 'insensitive', // Case-insensitive search
                    },
                },
            });
        }if (location) {
            salons = await prisma.salon.findMany({
                where: {
                    location: {
                        contains: location,
                        mode: 'insensitive', // Case-insensitive search
                    },
                },
            });
        } if (ServiceName) {
            salons = await prisma.service.findMany({
                where: {
                    name: {
                                contains: name,
                                mode: 'insensitive', // Case-insensitive search
                    },
                },
            });
        } else {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }

        return res.status(200).json({ status: 200, data: salons });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process search result' });
    } finally {
        await prisma.$disconnect();
    }
}


