import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer'; // Example: Import multer for handling multipart/form-data

const prisma = new PrismaClient();

// Example: Configure multer for handling image uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store images in memory; adjust as per your needs
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size if needed
  },
});

// Example: Middleware to handle file upload
const uploadImage = upload.single('image');

export const AddSalonImage = async (req: Request, res: Response) => {
  // Example: Handle file upload
  uploadImage(req, res, async (err: unknown) => {
    if (err) {
      console.error('Error uploading image:', err);
      return res.status(400).json({ message: 'Failed to upload image' });
    }

    const { image, salonId } = req.body;
    if (!image || !salonId) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    try {
      const updatedSalon = await prisma.salon.update({
        where: {
          id: salonId,
        },
        data: {
          image: image, // Assuming 'image' is a URL or base64 data stored in the database
        },
      });

      return res.status(200).json({ status: 200, message: 'Image added successfully', data: updatedSalon });
    } catch (error) {
      console.error('Error updating salon image:', error);
      return res.status(500).json({ status: 500, error: 'Failed to update salon image' });
    } finally {
      await prisma.$disconnect();
    }
  });
};
