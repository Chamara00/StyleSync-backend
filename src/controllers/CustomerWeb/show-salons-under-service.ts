import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SalonsUnderService(req: Request, res: Response) {
  const { serviceName } = req.query;
  try {
    if (!serviceName) {
      return res.status(400).json({ message: 'Please provide service type' });
    }

    const salonsId = await prisma.service.findMany({
      where: {
        name: String(serviceName),
      },
      select: {
        serviceStaff: {
          select: {
            staff: {
              select: {
                salonStaff: {
                  select: {
                    salon: {
                      select: {
                        id: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (salonsId.length === 0) {
      return res.status(404).json({ message: 'No salons found under this category' });
    }
    const salonIds = new Set<number>();
    salonsId.forEach((salon) => {
      salon.serviceStaff.forEach((staff) => {
        staff.staff.salonStaff.forEach((salonStaff) => {
          salonIds.add(salonStaff.salon.id);
        });
      });
    });

    const uniqueSalonIds = Array.from(salonIds);

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
