import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma =new PrismaClient();

export async function ShowService (req: Request ,res: Response) {
    const {staffId} = req.query;

    try{
        if(!staffId){
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }else{
            const getServiceId = await prisma.serviceStaff.findMany({
                where:{
                    staffId:Number(staffId)
                    },
                select:{
                    serviceId:true  
                }
            });
            const SeviceIdOfStaffMember = getServiceId.map(service => service.serviceId);
            if (!SeviceIdOfStaffMember) {
                return res.status(400).json({ status: 400, error: 'StaffId not found' });
            }else{
                const results: unknown [] = [];
                for (let i = 0; i < SeviceIdOfStaffMember.length; i++){
                    const getServiceDetails =await prisma.service .findMany({
                        where:{
                            id: SeviceIdOfStaffMember[i]
                        },
                        select:{
                            id:true,
                            name:true,                  
                            serviceType:true,            
                            price:true,                  
                            duration:true  
                        }  
                    });
                    results.push(...getServiceDetails);
                   
                }
                return res.status(200).json({ status: 200, data: results,message: 'successfully display an  salon Address.'}); 
            }
         
            
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process' });
    } finally {
        await prisma.$disconnect();
    }

}