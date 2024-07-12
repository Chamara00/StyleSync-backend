import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function TempCustomerCreate(req: Request, res: Response){
    const {email, contactNo, userName,date} = req.body;
    const generateTempPassword = () => {
        return Math.random().toString(36).slice(-8); 
      };
     
    try{
        if(!email || !contactNo || !userName || !date){
            return res.status(400).json({message: 'Please fill all the fields'});
        }
            const tempPassword = generateTempPassword();
            const expirationTime = new Date(date);  // set expiration to appointment time
            expirationTime.setMinutes(expirationTime.getMinutes() + 15);  // Link expires 15 minutes after appointment time
            
            // Create the temporary user record
            const tempUser = await prisma.customer.create({
              data: {
                email,
                name:userName,
                password: await bcrypt.hash(tempPassword, 10), // Hash the password
                isTemporary: true,  // Flag for temporary users
                contactNo
              },
            });
            const userId = tempUser.id;
            const token = crypto.randomBytes(16).toString('hex');  // Generate a unique token
            const link = `http://localhost:3000/temporary-login?token=${token}&userId=${userId}`;
            
            // Store the token and associated userId in the database
            await prisma.tempToken.create({
              data: {
                token,
                userId,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000),  // Token expires in 15 minutes
              },
            });

            return res.status(200).json({status:200, message:'Success',data:link, data2:userId});
        
    }catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registered salons' });
  } finally {
    await prisma.$disconnect();
  }
}