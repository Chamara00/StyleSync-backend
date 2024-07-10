import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function AddStaffImage(req: Request, res: Response) {
  const { salonId, image,staffId } = req.body;
  try {
    if(!salonId || !image || !staffId){
      return res.status(400).json({message: 'Inputs not found'});
    }
    const staff = await prisma.staff.updateMany({
      where:{
        id: staffId
      },
      data:{
        image: image
      }

    });
    return res.status(201).json({ status: 201, message: 'image update successfully' , data:staff });
  } catch (error) {
    console.log(error);
  }
}
