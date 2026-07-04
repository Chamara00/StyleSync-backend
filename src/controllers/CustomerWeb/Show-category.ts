import prisma from '../../utils/prismaClient';
import { Request, Response } from 'express';

export async function ShowAvailableCategories(req: Request, res: Response) {
  try {
    const getCategories = await prisma.allServices.findMany({
      select: {
        serviceType: true,
      },
    });
    const uniqueCategories = [...new Set(getCategories.map((category) => category.serviceType))]; //creates a new array from the set of unique serviceType

    return res.status(200).json({ status: 200, data: uniqueCategories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registered salons' });
  }
}
