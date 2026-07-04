import prisma from '../../../utils/prismaClient';
import { Request, Response } from 'express';
//3.2 create breaks


export async function createBreak(req: Request, res: Response) {
  const { staffId, dayName, breakStart, breakEnd } = req.body;

  try {
    if (!staffId || !dayName || !breakStart || !breakEnd) {
      return res.status(400).json({ status: 400, error: 'inputs not found' });
    } else {
      const createBreaks = await prisma.breaks.create({
        data: {
          staffId,
          dayName,
          breakStart,
          breakEnd
        },
      });
      return res.status(201).json({ status: 201, message: 'Step 1 successful', breaks: createBreaks });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process step 1' });
  }
}
