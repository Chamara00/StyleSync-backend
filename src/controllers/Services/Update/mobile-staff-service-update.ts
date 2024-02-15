import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
 export async function updateStaffService(req: Request, res: Response) {
    const {staffId, serviceName, price, duration} = req.body;
    try{
        if(!staffId || !serviceName || !price || !duration){
            return res.status(400).json({ status: 400, error: 'salon id or day name not found' });
        }
        else{
            await prisma.serviceStaff.findMany({
                where: {
                    staffId: staffId,
                    serviceId: serviceName
                },
                data:{
                    price,
                    duration
                }
            });
            return res.status(201).json({ status: 201, message: 'Update successful' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
 }