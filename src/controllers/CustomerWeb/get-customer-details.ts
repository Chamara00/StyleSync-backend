import prisma from '../../utils/prismaClient';
import { Request, Response } from 'express';

export async function CustomerDetails(req: Request, res: Response){
    const {userId} = req.query;
    try{
        if(!userId){
            return res.status(400).json({message: 'Please provide a user id.'});
        }
        const data = await prisma.customer.findMany({
            where:{
                id:Number(userId)
            },
            select:{
                name:true,
                email:true,
                contactNo:true,
                image:true,
                isTemporary:true,
                isVerified:true
            }
        });
        return res.status(200).json({status:200, message:'Successfull', data});
    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
      }
}