import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const AddSalonImage = async (req: Request, res: Response) => {
  const {image,salonId} = req.body;
  if(!image || !salonId ){
    return res.status(400).json({message:'inputs not found'});
  }

  try {
    const salons = await prisma.salon.update({
        where:{
            id:salonId
        },
      data:{
        image:image
      }
    });

    return res.status(200).json({status:200, message:'Created successfully', data:salons});
  }catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  } finally {
    await prisma.$disconnect();
  }
};