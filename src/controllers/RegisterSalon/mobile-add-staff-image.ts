import prisma from '../../utils/prismaClient';
import { Request, Response } from 'express';

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
