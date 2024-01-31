import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

const prisma  = new PrismaClient();

export async function registerSalon(req: Request, res: Response){
    const { name, contactNo, email} = req.body;

    try{
        if (!name || !contactNo || !email){
            return res.status(400).json({ status: 400, error:'Invlid input format'});
        }

        const existingUser = await prisma.salon.findUnique({ where: {contactNo}});

        if(existingUser){
            return res.status(400).json({ status: 400, message: 'User already exists'});
        }

        
    }
    catch(error){
        console.log(error);
    }
}