import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateSalonAddress(req: Request, res: Response){
    const {salonId,line1,line2,city,country } = req.body;
    try{
    if( !salonId|| !line1|| !line2 || !city || !country  ){
        return res.status(400).json({ status: 400, error: 'Invalid input format' });
    }else{
        const updateStaffService = await  prisma.salon .updateMany({
            where :{
                id: salonId
            },
            data:{
                line1:line1,
                line2:line2,
                city:city,
                country:country

            }
        });
        return res.status(201).json({ status: 201, message: 'Update successful', data: updateStaffService });
    }
}catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to process' });
} finally {
    await prisma.$disconnect();
}
}