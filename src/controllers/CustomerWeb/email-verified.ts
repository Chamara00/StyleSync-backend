import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service
  auth: {
    user: 'aherath83@gmail.com',
    pass: 'msph ymxi xtqg nupk',
  },
});

async function sendOTPEmail(email: string, link: string) {
  const mailOptions = {
    from: 'aherath83@gmail.com',
    to: email,
    subject: 'Your Profile Link',
    text: `Use this link to login your temporary account ${link}`,
  };

  return transporter.sendMail(mailOptions);
}

export async function EmailVerified(req: Request, res: Response) {
  const { userId, otp, link, email } = req.body;
  try {
    if (!userId || !otp || !link || !email) {
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

        sendOTPEmail(email,link);
        return res.status(200).json({status:200, message:'Success', data: verified});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  } finally {
    await prisma.$disconnect();
  }
}
