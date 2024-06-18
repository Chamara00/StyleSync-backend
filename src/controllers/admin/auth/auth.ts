import { Request, Response } from 'express';
import { signToken, setTokenAsCookie, removeCookieToken } from '../../../utils/adminAuth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function adminLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const existingUser = await prisma.admin.findUnique({
      where: {
        email:email,
      },
    });

    if (!existingUser) {
      res.status(400).json({ error: 'Email does not exist' });
      return;
    }

    const admin = await prisma.admin.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    if (!admin) {
      res.status(400).json({ error: 'Invalid password' });
      return;
    }

    const simplifiedClient = {
      id: admin.id,
      email: admin.email,
    };

    const token = await signToken({ user: simplifiedClient });

    setTokenAsCookie(res, token);

    res.status(200).json({ message: 'Login successful' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } finally {
    await prisma.$disconnect();
  }
}

export async function adminLogout(req: Request, res: Response) {
  try {
    removeCookieToken(res);
    res.status(200).json({ message: 'Logout successful' });
    res.end();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
