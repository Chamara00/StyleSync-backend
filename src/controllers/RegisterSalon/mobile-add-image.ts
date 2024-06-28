import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../../uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

export const addSalonImage = upload.single('file');

export const addSalonImageHandler = async (req: Request, res: Response) => {
  try {
    const { salonId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
    const imagePath = file.path;
    const salon = await prisma.salon.update({
      where: {
        id: salonId,
      },
      data: {
        imagePath:imagePath
      },
    });

    res.status(200).send({ message: 'File uploaded successfully', salon });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send({ message: 'Error uploading file' });
  }
};
