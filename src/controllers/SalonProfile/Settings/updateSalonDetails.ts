import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateSalonProfileDetails(req: Request, res: Response){
    const {salonId,name,contactNo } = req.body;
    try{
    if( !salonId|| !name || !contactNo ){
        return res.status(400).json({ status: 400, error: 'salon id or day name not found' });
    }else{
        const updateStaffService = await  prisma.salon .updateMany({
            where :{
                id: salonId
            },
            data:{
                name:name,
                contactNo:contactNo
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