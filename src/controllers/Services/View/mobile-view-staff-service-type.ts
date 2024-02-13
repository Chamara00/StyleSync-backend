// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function getServiceType(req: Request, res: Response) {
//     const { staffId, serviceType } = req.body;
//     try{
//         if(!staffId || !serviceType){
//             return res.status(400).json({ status: 400, error: 'salon id not found' });
//         }
//         const getServiceName = await prisma.serviceStaff.findMany ({
//             where: {
//                 staffId
//             },
//             select: {
//                 //serviceName: true
//             }
//         });
//         //const existingServiceName = getServiceName.map(service => service.serviceName);
//         let i =0;
//         while(existingServiceName[i]!=null){
//             await prisma.service.findMany({
//                 where: {
//                     name: existingServiceName[i]
//                 },
//                 select: {
//                     serviceType
//                 }
//             });
//             i++;
//         }
        
//         return res.status(200).json({ status: 200 });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: 500, error: 'Failed to process' });
//     } finally {
//         await prisma.$disconnect();
//     }
// }