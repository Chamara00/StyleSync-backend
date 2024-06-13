import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function Home(req: Request, res: Response) {
  try {
    {
      const getSalon = await prisma.salon.findMany({
        select: {
          name: true,
          location: true,
          line1: true,
          line2: true,
          city: true,
          country: true,
        },
      });
      return res.status(200).json({ status: 200, data: getSalon });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registerd salons' });
  } finally {
    await prisma.$disconnect();
  }
}
