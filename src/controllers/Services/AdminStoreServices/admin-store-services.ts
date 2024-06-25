import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createNewService(req: Request, res: Response) {

    const { service , serviceType, price, duration  } = req.body;

    try{
        if(!service || !serviceType || !price || !duration){
            return res.status(400).json({ status: 400, error: 'inputs not found' });
        }
        else{
            const createServices = await prisma.allServices.create({
                data: {
                    service,
                    serviceType,
                    price,
                    duration
                },
            });
            return res.status(201).json({ status: 201, message: 'Step 1 successful', breaks: createServices });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process step 1' });
    } finally {
        await prisma.$disconnect();
    }
}