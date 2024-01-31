// Salon registration enter app for mobile app

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function enterAddressForSalon(req: Request, res: Response){
    const {line1, line2, city, country} = req.body;

    try{
        if(!line1 || !line2 || !city || !country){
            return res.status(400).json({ status: 400, error:'Invlid input format'});
        }

        const newSalonEnterAddress = await prisma.address.create({
            data: {
                line1,
                line2,
                city,
                country,
            },
        });

        return  res.status(201).json({status: 201, message: 'Enter address successful', address: newSalonEnterAddress});
    }
    catch(error){
        console.log(error);
    }
}
