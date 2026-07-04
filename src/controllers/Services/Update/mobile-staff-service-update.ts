import prisma from '../../../utils/prismaClient';
import { Request, Response } from 'express';
 export async function updateStaffServiceInfo(req: Request, res: Response) {
    const {serviceId, price, duration} = req.body;
    try{
        if( !serviceId || !price || !duration){
            return res.status(400).json({ status: 400, error: 'salon id or day name not found' });
        }
        else{
            const updateStaffService = await  prisma.service.updateMany({
                where :{
                    id: serviceId
                },
                data:{
                    price:price,
                    duration: duration
                }
            });
            return res.status(201).json({ status: 201, message: 'Update successful', data: updateStaffService });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    }
 }