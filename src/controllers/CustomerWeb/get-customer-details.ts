import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
                image:true
            }
        });
        return res.status(200).json({status:200, message:'Successfull', data});
    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
      } finally {
        await prisma.$disconnect();
      }
}