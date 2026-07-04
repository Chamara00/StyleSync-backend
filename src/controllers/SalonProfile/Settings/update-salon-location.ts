import prisma from '../../../utils/prismaClient';
import { Request, Response } from 'express';

export async function updateLocation(req: Request, res: Response) {
  const { salonId, latitude, longitude } = req.body;
  try {
    if (!salonId || !latitude || !longitude) {
      return res.status(400).json({ status: 400, error: 'salon id not found' });
    } else {
      const updatedLocation = await prisma.salon.updateMany({
        where: {
          id: salonId,
        },
        data: {
          latitude: latitude,
          longtitude: longitude,
        },
      });
      return res.status(201).json({ status: 201, message: 'Update successful', data: updatedLocation });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  }
}
