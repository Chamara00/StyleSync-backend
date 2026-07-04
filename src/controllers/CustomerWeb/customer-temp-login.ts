import prisma from '../../utils/prismaClient';
import { Request, Response } from 'express';

export async function HandleTempLogin(req: Request, res: Response) {
  const { token,userId } = req.query;
  try{
    if(!token || !userId ){
        return res.status(400).json({message: 'Not found token or user id.'});
    }
    const tempToken = await prisma.tempToken.findUnique({
        where: {
          token: String(token),
          userId:Number(userId)
        },
        select: {
          userId: true,
          expiresAt: true,
          token: true,
        },
      });
    
      if (!tempToken?.token || tempToken.expiresAt < new Date()) {
        return res.status(400).json({ error: 'Token expired or invalid' });
      }
    
      return res.status(200).json({status:200, message:'Success',data:tempToken.userId});
  }catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registered salons' });
  }

  
}
