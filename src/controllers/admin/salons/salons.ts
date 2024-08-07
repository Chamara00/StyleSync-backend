import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export const getAllSalons = async (req: Request, res: Response) => {
  try {
    const salons = await prisma.salon.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        line1: true,
        line2: true,
        city: true,
        country: true,
        //username: true,
        image: true,
        latitude: true,
        longtitude: true,
        contactNo: true,
        review: true,
        article: true,
        salonStaff: true,
      },
    });
    res.status(200).json(salons);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSalonById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Salon ID is required' });
  }

  try {
    const salon = await prisma.salon.findUnique({
      where: { id: Number(id) },
      include: {
        review: true,
        article: true,
        salonStaff: {
          include: {
            staff: true,
          },
        },
      },
    });

    if (!salon) {
      return res.status(404).json({ error: 'Salon not found' });
    }

    res.status(200).json(salon);
  } catch (error) {
    console.error('Error fetching salon by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};

export async function deleteSalon(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ status: 400, error: 'Salon ID is required' });
  }

  try {
    // Find the salon details
    const salon = await prisma.salon.findUnique({
      where: { id: Number(id) },
    });

    if (!salon) {
      return res.status(404).json({ status: 404, error: 'Salon not found' });
    }

    // Delete the salon
    await prisma.salon.delete({
      where: { id: Number(id) },
    });

    // send an email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'stylesync26@gmail.com',
        pass: 'kgjm detu kfpo opsq',
      },
    });

    const mailOptions = {
      from: 'stylesync26@gmail.com',
      to: salon.email,
      subject: 'Your salon deleted',
      text: `Dear ${salon.name}, your salon has been deleted from our system.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json('Salon deleted and email sent');
  } catch (error) {
    console.error('Error deleting salon:', error);
    res.status(500).json({ status: 500, error: 'Failed to delete salon' });
  } finally {
    await prisma.$disconnect();
  }
}

export const getSalonCount = async (req: Request, res: Response) => {
  try {
    const count = await prisma.salon.count();
    console.log({ ' salon count': count });
    res.status(200).json(count);
  } catch (error) {
    console.error('Error fetching salon count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
