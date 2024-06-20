import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SalonsUnderCategories(req: Request, res: Response) {
  const { serviceType } = req.query;
  try {
    if (!serviceType) {
      return res.status(400).json({ message: 'Please provide service type' });
    }

    const salonsIds = await prisma.service.findMany({
      where: {
        serviceType: String(serviceType),
      },
      select: {
        serviceStaff: {
          select: {
            staff: {
              select: {
                salonStaff: {
                  select: {
                    salonId: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (salonsIds.length === 0) {
      return res.status(404).json({ message: 'No salons found under this category' });
    }

    // Flatten the nested arrays and remove duplicates using a Set
    const salonIdSet = new Set<number>();
    salonsIds.forEach((salon) =>
      salon.serviceStaff.forEach((staff) =>
        staff.staff.salonStaff.forEach((salonStaff) => {
          salonIdSet.add(salonStaff.salonId);
        })
      )
    );

    const uniqueSalonIds = Array.from(salonIdSet);
    // Fetch salon details based on unique salon IDs
    const results = await prisma.salon.findMany({
      where: {
        id: {
          in: uniqueSalonIds,
        },
      },
      select: {
        id: true,
        name: true,
        line1: true,
        line2: true,
        city: true,
        contactNo: true,
      },
    });

    return res.status(200).json({ status: 200, message: 'successful', data: results });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registered salons' });
  } finally {
    await prisma.$disconnect();
  }
}
