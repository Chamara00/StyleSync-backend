import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function Home(req: Request, res: Response) {
    const { field1, date, gender, ServiceName } = req.body;

    try {
        if (!field1 && !date && !gender && !ServiceName) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }

        //let salons;



        //First need to search added field1 is equal to any salon name or salon location in salon model 

        // if field1 equal to any salon name in salon model then need to get salon name, location, line1, line2, city, country,review of that salon and display that details in front end
        // if field1 equal to any salon location in salon model then need to get salon names, location, line1, line2, city, country,review of that salons and display that details in front end
        const salons = await prisma.salon.findMany({
            where: {
                OR: [
                    { name: { contains: field1 } },
                    { location: { contains: field1 } }
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
