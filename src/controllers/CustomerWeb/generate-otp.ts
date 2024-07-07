import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

function generateOTP() {
  const otp = crypto.randomInt(0, 1000000);
  return otp.toString().padStart(6, '0');
}

const prisma = new PrismaClient();

export async function GenerateOTP(req:Request,res:Response){
    const {userId,email}= req.body;
    try{
        if(!userId || !email){
            return res.status(400).json({message:'Please provide all the details'});
        }
        const otp = await prisma.customer.updateMany({
            where:{
                id:userId,
                email:email
            },
            data:{
                OTP:generateOTP()
            }
        });

        return res.status(200).json({status:200,message:'Success',data:otp});
    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
      } finally {
        await prisma.$disconnect();
      }
}