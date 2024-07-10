import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function EmailVerified(req: Request, res: Response) {
  const { salonId, otp } = req.body;
  try {
    if (!salonId || !otp) {
      return res.status(400).json({ message: 'Please provide all the details' });
    }
    const getOtp = await prisma.salon.findMany({
      where: {
        id: salonId,
      },
      select: {
        otp: true,
      },
    });

    if(!getOtp[0].otp){
        return res.status(400).json({ message: 'OTP not found' });
    }
    else if(getOtp[0].otp !== otp){
        return res.status(400).json({ message: 'OTP not matched' });
    }
    else{
        const verified = await prisma.salon.update({
            where:{
                id:salonId
            },
            data:{
                emailVerified: true
            }
        });
        return res.status(200).json({status:200, message:'Success', data: verified});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  } finally {
    await prisma.$disconnect();
  }
}
