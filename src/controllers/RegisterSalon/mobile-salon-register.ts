import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const RegisterSalon = async (req: Request, res: Response) => {
  const {name, email, contactNo, line1, line2, city, country,latitude,longitude} = req.body;
  if(!name || !email || !contactNo || !line1 || !line2 || !city || !country || !latitude || !longitude){
    return res.status(400).json({message:'inputs not found'});
  }

  try {
    const salons = await prisma.salon.create({
      data:{
        name:name,
        email:email,
        contactNo:contactNo,
        line1:line1,
        line2:line2,
        city:city,
        country:country,
        latitude:latitude,
        longtitude:longitude
      }
    });

    return res.status(200).json({status:200, message:'Created successfully', data:salons});
  }catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  } finally {
    await prisma.$disconnect();
  }
};