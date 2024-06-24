import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SalonsAvailableServices(req: Request, res: Response) {
  const { serviceType } = req.query;
  try {
    if (!serviceType) {
      return res.status(400).json({ message: 'Please provide service type' });
    }
    const categories = await prisma.service.findMany({
      where: {
        serviceType: String(serviceType),
      },
      distinct: ['name'],
      select: {
        name: true,
      },
    });
    console.log(categories);
    return res.status(200).json({ status: 200, message: 'successful', data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registered salons' });
  } finally {
    await prisma.$disconnect();
  }
}
