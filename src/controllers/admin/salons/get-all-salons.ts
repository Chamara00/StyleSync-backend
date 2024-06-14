import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllSalons = async (req: Request, res: Response) => {
  try {
    const salons = await prisma.salon.findMany({
        select: {
            id: true,
            name: true,
            email:true,
            location: true,
            line1:true,
            line2:true,
            city:true,
            country:true,
            username:true,
            contactNo:true,
            review:true,
            article:true,
            salonStaff:true
        }
    });
    res.status(200).json(salons);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};