// Salon registration in mobile app

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function registerStaff(req: Request, res: Response) {
    const { name, gender, staffContact } = req.body;

    try {
        if (!name || !gender || !staffContact) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }

        const existingStaff = await prisma.staffContact.findUnique({
            where: { contactNo: staffContact } as { contactNo: string } // Explicitly cast to the correct type
        });        

        if (existingStaff) {
            return res.status(400).json({ status: 400, error: 'Salon with this contact already exists' });
        }

        const newStaff = await prisma.staff.create({
            data: {
                name,
                gender,
                staffContact: { // Assuming there is a relationship field named 'contact'
                    create: {
                        contactNo: staffContact
                    }
                }
            },
            include: {
                staffContact: true // Include the contact information in the response if needed
            }
        });
        

        return res.status(201).json({ status: 201, message: 'Step 1 successful', staff: newStaff });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process step 1' });
    } finally {
        await prisma.$disconnect();
    }
}
