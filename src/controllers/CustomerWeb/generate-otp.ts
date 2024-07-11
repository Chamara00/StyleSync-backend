import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

function generateOTP() {
  const otp = crypto.randomInt(0, 1000000);
  return otp.toString().padStart(6, '0');
}

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service
  auth: {
    user: 'aherath83@gmail.com',
    pass: 'msph ymxi xtqg nupk',
  },
});

async function sendOTPEmail(email: string, otp: string) {
  const mailOptions = {
    from: 'aherath83@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  return transporter.sendMail(mailOptions);
}

export async function GenerateOTP(req: Request, res: Response) {
  const { userId, email } = req.body;
  try {
    if (!userId || !email) {
      return res.status(400).json({ message: 'Please provide all the details' });
    }

    const otp = generateOTP();

    const updatedCustomer = await prisma.customer.updateMany({
      where: {
        id: userId,
        //email: email,
      },
      data: {
        OTP: otp,
      },
    });

    if (updatedCustomer.count === 0) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }

    await sendOTPEmail(email, otp);

    return res.status(200).json({ status: 200, message: 'Success', data: updatedCustomer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  } finally {
    await prisma.$disconnect();
  }
}
