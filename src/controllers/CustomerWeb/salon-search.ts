import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SearchResult(req: Request, res: Response) {
  const { key } = req.query;

  try {
    if (!key) {
      return res.status(400).json({ status: 400, error: 'No inputs found' });
    }

    // Queries to get salon IDs based on different criteria
    const salonName = await prisma.salon.findMany({
      where: {
        name: {
          contains: String(key),
          mode: 'insensitive',
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

    // If you have different criteria, you might need to adjust the queries accordingly
    const salonLine1 = await prisma.salon.findMany({
      where: {
        line1: {
          contains: String(key),
          mode: 'insensitive',
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

    const salonLine2 = await prisma.salon.findMany({
      where: {
        line2: {
          contains: String(key),
          mode: 'insensitive',
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

    const salonCity = await prisma.salon.findMany({
      where: {
        city: {
          contains: String(key),
          mode: 'insensitive',
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

    // const service = await prisma.service.findMany({
    //     where:{
    //         name:{
    //             contains:String(key),
    //             mode:'insensitive'
    //         }
    //     },
    //     select:{
    //         serviceStaff:{
    //             select:{
    //                 staff:{
    //                     select:{
    //                         salonStaff:{
    //                             select:{
    //                                 salonId:true
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // });
    // const serviceType = await prisma.service.findMany({
    //     where:{
    //         serviceType:{
    //             contains:String(key),
    //             mode:'insensitive'
    //         }
    //     },
    //     select:{
    //         serviceStaff:{
    //             select:{
    //                 staff:{
    //                     select:{
    //                         salonStaff:{
    //                             select:{
    //                                 salonId:true
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // });

    // Extract salon IDs from the results
    const salonIds1 = salonName.map((a) => ({
      id: a.id,
      name: a.name,
      line1: a.line1,
      line2: a.line2,
      city: a.city,
      contactNo: a.contactNo,
    }));
    const salonIds2 = salonLine1.map((a) => ({
      id: a.id,
      name: a.name,
      line1: a.line1,
      line2: a.line2,
      city: a.city,
      contactNo: a.contactNo,
    }));
    const salonIds3 = salonLine2.map((a) => ({
      id: a.id,
      name: a.name,
      line1: a.line1,
      line2: a.line2,
      city: a.city,
      contactNo: a.contactNo,
    }));
    const salonIds4 = salonCity.map((a) => ({
      id: a.id,
      name: a.name,
      line1: a.line1,
      line2: a.line2,
      city: a.city,
      contactNo: a.contactNo,
    }));

    // Combine all IDs into a single array
    const allSalonIds = [...salonIds1, ...salonIds2, ...salonIds3, ...salonIds4];

    // Remove duplicates using Set
    const uniqueSalonIds = Array.from(new Set(allSalonIds));

    if (uniqueSalonIds.length === 0) {
      return res.status(200).json({ status: 200, message: 'No result found' });
    }

    return res.status(200).json({ status: 200, message: 'Success', data: uniqueSalonIds });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registered salons' });
  } finally {
    await prisma.$disconnect();
  }
}
