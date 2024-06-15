import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ShowAvailableCategories(req: Request, res: Response) {
  try {
    const getCategories = await prisma.allServices.findMany({
      select: {
        serviceType: true,
      }
    });
    const uniqueCategories = [...new Set(getCategories.map(category => category.serviceType))];

    return res.status(200).json({ status: 200, data: uniqueCategories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registered salons' });
  } finally {
    await prisma.$disconnect();
  }
}
