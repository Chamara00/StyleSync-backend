import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const AddSalonImage = async (req: Request, res: Response) => {
  const { salonImage, salonId } = req.body;

  try {
    // Update the salon record in the database with the image path
    const updatedSalon = await prisma.salon.update({
      where: { id: salonId },
      data: { image: salonImage }, // Assuming 'image' is the field in your salon table to store the path
    });

    return res.status(200).json({
      status: 200,
      message: 'Image added successfully',
      data: updatedSalon,
    });
  } catch (error) {
    console.error('Error adding image:', error);
    return res.status(500).json({ status: 500, error: 'Failed to add image' });
  } finally {
    await prisma.$disconnect();
  }
};
