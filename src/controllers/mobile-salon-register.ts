// Salon registration in mobile app

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function registerSalonStep1(req: Request, res: Response){
    const { name, contactNo, email} = req.body;

    try{
        if (!name || !contactNo || !email){
            return res.status(400).json({ status: 400, error:'Invlid input format'});
        }

        const existingSalon = await prisma.salon.findUnique({
            where: {contactNo}
        });

        if(existingSalon){
            return res.status(400).json({ status: 409, error: 'Salon with this contact no exisits'});
        }

        const newSalonStep1 = await prisma.salon.create({
            data : {
                name,
                contactNo,
                email,
            },
        });

        return res.status(201).json({ status: 201, message: 'Step 1 successful', salon: newSalonStep1 });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to prcoess step 1'});
    }
    finally{
        await prisma.$disconnect();
    }
}