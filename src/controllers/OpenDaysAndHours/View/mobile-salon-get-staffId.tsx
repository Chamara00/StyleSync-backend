import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
//3.1 update open days and hours

const prisma = new PrismaClient();

export async function getStaffId(req: Request, res: Response) {
  const { contactNo } = req.body;

  try {
    if (!contactNo) {
      return res.status(400).json({ status: 400, error: 'salon id or day name not found' });
    } else {
      const getStaffId = await prisma.staffContact.findMany({
        where: { contactNo: contactNo },
        select: {
          staffId: true,
        },
      });
      return res.status(200).json({ status: 200, data: getStaffId });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  } finally {
    await prisma.$disconnect();
  }
}
