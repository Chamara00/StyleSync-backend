import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function updatStaffMemberProfile(req:Request , res:Response){
    const {salonId,staffId,name,contactNo, gender}= req.body;

    try{
        if(!salonId || !staffId || !name || !contactNo || !gender){
            return res.status(400).json({status: 400, error: 'Invalid Input'});
        }else{
            const UpdateStaffMemberDetails = await prisma.staff.update({
                where:{
                    salonStaff:{
                        some:{
                            salonId:salonId
                        }
                    },
                   id:staffId,
                },
                data:{
                    name: name,
                    gender:gender,
                    staffContact:{
                        updateMany: {
                            where: {
                                staffId: staffId,
                            },
                            data: {
                                contactNo: contactNo,
                            },
                        },  
                    }
                },
                include: {
                    staffContact: true,
                },
            });
            return res.status(201).json({ status: 201, message: 'Update successful', data: UpdateStaffMemberDetails  });
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    }finally {
        await prisma.$disconnect();
    }
}