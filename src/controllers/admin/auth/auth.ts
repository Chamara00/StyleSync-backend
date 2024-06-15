import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../../../utils/adminAuth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function adminLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email: email },
    });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const token = generateToken({
      id: admin.id.toString(),
      email: admin.email,
    });
    res.status(200).json({ message: 'Login successful', token: token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
