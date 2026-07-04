import prisma from '../../utils/prismaClient';
import { Request, Response } from 'express';
//3.2 update existing break

 export async function updateEmail(req: Request, res: Response) {

    const {salonId , email ,newEmail} = req.body;
    try{
        if(!salonId || !email || !newEmail){
            return res.status(400).json({ status: 400, error: 'Invalid Input' });
        }
        else{
            await prisma.salon.updateMany({
                where: {
                    id:salonId,
                    email:email  
                },
                data:{
                    email:newEmail
                }
            });
            return res.status(201).json({ status: 201, message: 'Update successful' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    }
 }