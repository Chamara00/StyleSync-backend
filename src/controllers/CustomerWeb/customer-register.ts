import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function CustomerRegister(req: Request, res: Response) {
  const { name, email, password, confirmPassword } = req.body; //requried data from front-end
  try {
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'input not found' });
    } else if (password !== confirmPassword) {
      return res.status(400).json({ message: 'password not match' });
    } else {
      //create new customer
      const customer = await prisma.customer.create({
        data: {
          name,
          email,
          password,
          gender: 'null', //gender is nullwhen customer registration
        },
      });
      return res.status(200).json({ status: 200, message: 'Register Customer Successfully', data: customer });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
  } finally {
    await prisma.$disconnect();
  }
}
