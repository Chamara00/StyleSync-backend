import { Request , Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function ShowStaffMemberProfile(req: Request , res:Response){
    const {salonId,staffId} =req.query;

    try{
        if(!salonId || !staffId){
            return res.status(400).json({status:400, error:'nvalid input format'});
        }else{
            const staffDetails = await prisma.salonStaff.findMany({
                where:{
                    salonId: Number(salonId),
                    staffID: Number(staffId)
                },
                select:{
                    staff:{
                        select:{
                            name: true,
                            staffContact:{
                                select:{
                                    contactNo:true
                                }
                            }
                        }
                    }
                }
            }); 
            return res.status(200).json({ status: 200, data: staffDetails,message: 'successfully display an  salon Address.'}); 
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }
}