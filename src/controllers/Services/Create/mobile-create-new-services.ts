import prisma from '../../../utils/prismaClient';
import { Request, Response } from 'express';
//3.2 create breaks


export async function createNewService(req: Request, res: Response) {
  const { staffId,name,serviceType,price,duration} = req.body;

  try {
    if (!staffId || !name|| !serviceType || !price || !duration) {
      return res.status(400).json({ status: 400, error: 'inputs not found' });
    } else {
      const createNewService = await prisma.service.create({
        data: {
          name,
          serviceType,
          price,
          duration,
          serviceStaff:{
             create:{staffId}
          }
        },
      });
      return res.status(201).json({ status: 201, message: 'Step 1 successful', service: createNewService });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process step 1' });
  }
}