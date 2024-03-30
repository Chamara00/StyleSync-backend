// Salon registration in mobile app

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function registerSalonStep1(req: Request, res: Response){
    const { name, contactNo, email} = req.body;

    try{

        if (!name || !contactNo || !email){
            return res.status(400).json({ status: 400, error:'Invalid input format'});
        }

        const existingSalon = await prisma.salon.findUnique({
            where: {contactNo, email}
        });

        if(existingSalon){
            return res.status(401).json({ status: 400, error: 'Salon with this contact already exisits'});
        }

        const otp = generateOTP();
        await sendOTP(email, otp);

        await prisma.salon.create({
            data : {
                name,
                contactNo,
                email,
                otp,
            },
        });

        

        return res.status(201).json({ status: 201, message: 'OTP sent successfully'});
    }
    catch (error: unknown) {
        if (error instanceof Error) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    finally{
        await prisma.$disconnect();
    }
}

function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
}

async function sendOTP(email: string, otp: string){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'stylesync26@gmail.com',
            pass: 'ngtbfviurhciiqjp'
        }
    });

    const info = await transporter.sendMail({
        from : 'stylesync26@gmail.com',
        to: email,
        subject: 'OTP Verification for Salon Registration',
        text: `Your OTP for email verification is: ${otp}. It is valid for 5 minutes.`
    });

    console.log('Message sent: %s', info.messageId);
}