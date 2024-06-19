import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SalonsAvailableCategories(req: Request, res: Response) {
  try {
    const serviceCategories = await prisma.service.findMany({
        distinct:['serviceType'],
        select:{
          serviceType:true
        }
    });
    return res.status(200).json({status:200,message:'successful',data:serviceCategories});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registered salons' });
  } finally {
    await prisma.$disconnect();
  }
}
