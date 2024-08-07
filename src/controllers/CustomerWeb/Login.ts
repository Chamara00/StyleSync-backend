import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function LoginCustomer(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Step 1: Check if the email address exists in the customer model
    const existingCustomer = await prisma.customer.findUnique({
      where: {
        email,
      },
      select:{
        isVerified:true,
        password:true,
        id:true,
        email:true
      }
    });

    if (!existingCustomer) {
      return res.status(400).json({ status: 400, error: 'Email address not found' });
    }

    // Step 2: Verify if the provided password matches the password stored in the database
    if (existingCustomer.password !== password) {
      return res.status(401).json({ status: 401, error: 'Incorrect password' });
    }

    // If email and password are correct, customer can login successfully
    return res.status(200).json({ status: 200, message: 'Login successful', data: existingCustomer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to login' });
  } finally {
    await prisma.$disconnect();
  }
}
