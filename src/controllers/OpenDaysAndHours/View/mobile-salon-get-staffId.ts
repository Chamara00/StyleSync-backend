import prisma from '../../../utils/prismaClient';
import { Request, Response } from 'express';
//3.1 update open days and hours


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
      return res.status(201).json({ status: 201, data: getStaffId });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  }
}
