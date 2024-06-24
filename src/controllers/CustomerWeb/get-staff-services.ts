import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ServiceOfStaff(req: Request, res: Response) {
  const { staffId } = req.query;
  try {
    if (!staffId) {
      return res.status(400).json({ message: 'salon id not found' });
    }
    const staffServices = await prisma.serviceStaff.findMany({
      where: {
        staffId: Number(staffId),
      },
      select: {
        Service: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });
    const existingStaffServices = staffServices.map((a) => ({
      id: a.Service.id,
      name: a.Service.name,
      price: a.Service.price,
    }));
    return res.status(200).json({ status: 200, message: 'successful', data: existingStaffServices });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registered salons' });
  } finally {
    await prisma.$disconnect();
  }
}
