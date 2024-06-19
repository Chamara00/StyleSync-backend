import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllSalons = async (req: Request, res: Response) => {
  try {
    const salons = await prisma.salon.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        location: true,
        line1: true,
        line2: true,
        city: true,
        country: true,
        //username: true,
        contactNo: true,
        review: true,
        article: true,
        salonStaff: true,
      },
    });
    res.status(200).json(salons);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSalonById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Salon ID is required' });
  }

  try {
    const salon = await prisma.salon.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
        location: true,
        line1: true,
        line2: true,
        city: true,
        country: true,
        //username: true,
        contactNo: true,
        review: {},
        article: true,
        salonStaff: true,
      },
    });

    if (!salon) {
      return res.status(404).json({ error: 'Salon not found' });
    }

    res.status(200).json(salon);
  } catch (error) {
    console.error('Error fetching salon by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};

export const getSalonCount = async (req: Request, res: Response) => {
  try {
    const count = await prisma.salon.count();
    console.log({ ' salon count': count });
    res.status(200).json(count);
  } catch (error) {
    console.error('Error fetching salon count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
