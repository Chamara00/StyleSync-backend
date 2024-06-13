import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateSalonConfirmationInformation(req: Request, res: Response){
    const {salonId,username,password  } = req.body;
    try{
    if( !salonId|| !username || !password ){
        return res.status(400).json({ status: 400, error: 'salon id not found' });
    }else{
        const updateStaffService = await  prisma.salon .updateMany({
            where :{
                id: salonId
            },
            data:{
                // username:username,
                // password:password
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