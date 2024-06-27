import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ShowStaffList(req: Request ,res: Response){
    const {salonId} = req.query;
    try{
        if(!salonId){
            return res.status(400).json({ status: 400, error: 'SalonId not found' });
        }
        else{
            const findStaffIdList = await prisma.salonStaff.findMany({
                where:{
                    salonId: Number(salonId),
                },
                select:{
                    staffID:true,
                }
            });
            const existingStaffIdList = findStaffIdList.map(staff=> staff.staffID);
            if(!existingStaffIdList){
                return res.status(200).json({ status: 200, error: 'StaffId not found' });
            }
            else{
                const results: unknown [] = [];
                let i =0;
                while(existingStaffIdList[i]!=null){
                    const findStaffName = await prisma.staff.findMany({
                        where:{
                            id: existingStaffIdList[i],
                        },
                        select:{
                            id:true,
                            name:true,
                        }
                    });
                    results.push(findStaffName);
                    i++;
                }
                return res.status(200).json({ status: 200, data:results ,message: 'successfully display an staff list.'}); 
            }
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    }finally {
        await prisma.$disconnect();
    }
}