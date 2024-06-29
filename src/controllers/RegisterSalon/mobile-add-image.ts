import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function AddSalonImage(req: Request, res: Response) {
  const { salonId, image } = req.body;
  try {
    if(!salonId || !image){
      return res.status(400).json({message: 'Inputs not found'});
    }
    const salon = await prisma.salon.update({
      where: { id: salonId },
      data: { image: image },
    });
    return res.status(201).json({ status: 201, message: 'image update successfully', data: salon });
  } catch (error) {
    console.log(error);
  }
}
