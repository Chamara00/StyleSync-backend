// Salon registration in mobile app

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function registerSalonStep1(req: Request, res: Response){
    const { name, contactNo, email} = req.body;

    try{

        if (!name || !contactNo || !email){
            return res.status(400).json({ status: 400, error:'Invlid input format'});
        }

        const existingSalon = await prisma.salon.findUnique({
            where: {contactNo}
        });

        if(existingSalon){
            return res.status(400).json({ status: 400, error: 'Salon with this contact already exisits'});
        }

        const otp = generateOTP();
        await sendOTP(email, otp);

        const newSalonStep1 = await prisma.salon.create({
            data : {
                name,
                contactNo,
                email,
                otp
            },
        });

        const token = jwt.sign({ userId: newSalonStep1.id}, process.env.JWT_SECRET ||'fallback-secret', { expiresIn: '24h' } );

        return res.status(201).json({ status: 201, message: 'Step 1 successful', token});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to prcoess step 1'});
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
            pass: 'Style@#12Sync'
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