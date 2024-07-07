import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function EmailVerified(req: Request, res: Response) {
  const { userId, otp } = req.body;
  try {
    if (!userId || !otp) {
      return res.status(400).json({ message: 'Please provide all the details' });
    }
    const getOtp = await prisma.customer.findMany({
      where: {
        id: userId,
      },
      select: {
        OTP: true,
      },
    });

    if(!getOtp[0].OTP){
        return res.status(400).json({ message: 'OTP not found' });
    }
    else if(getOtp[0].OTP!==otp){
        return res.status(400).json({ message: 'OTP not matched' });
    }
    else{
        const verified = await prisma.customer.update({
            where:{
                id: userId
            },
            data:{
                isVerified: true
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
