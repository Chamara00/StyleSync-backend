import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function enterLocation (req: Request, res: Response){
    const { id, location } = req.body;

    try{
        if(!id || !location) {
            return res.status(400).json({ message: 'Invalid input format'});
        }

        prisma.salon.update({
            where: {id},
            data: {
                location
            }
        });

        return res.status(200).json({message:'Successfully updated salon location.', id});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to enter location' });
    }
    finally{
        prisma.$disconnect;
    }
}