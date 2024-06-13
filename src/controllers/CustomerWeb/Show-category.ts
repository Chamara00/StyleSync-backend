import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ShowAvailableCategories(req:Request, res:Response){
  try{
    const getCategories = await prisma.allServices.findMany({
      select:{
        serviceType:true,
      }
    });
    return res.status(200).json({status:200,data: getCategories});
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registerd salons' });
  }
  finally {
    await prisma.$disconnect();
  }
}
