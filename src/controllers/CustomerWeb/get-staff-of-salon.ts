import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function StaffOfSalon(req: Request, res: Response) {
    const {salonId} = req.query;
    try{
        if(!salonId){
            return res.status(400).json({message:'salon id not found'}); 
        }
        const staffNames = await prisma.salonStaff.findMany({
            where:{
                salonId:Number(salonId)
            },
            select:{
                staff:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        });
        const existingStaffNames = staffNames.map((a) => ({
            id: a.staff.id,
            name: a.staff.name
        }));
        return res.status(200).json({status:200,message:'successful',data:existingStaffNames});
    }catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, error: 'Failed to get registered salons' });
  } finally {
    await prisma.$disconnect();
  }
}