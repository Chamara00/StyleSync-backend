// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function ShowAvailableAppointments(req: Request, res: Response) {
//     const { salonId } = req.body;
//     try {
//         if (!salonId) {
//             return res.status(400).json({ status: 400, error: 'Inputs not found' });
//         } else {
//             const findStaffId = await prisma.salonStaff.findMany({
//                 where: {
//                     salonId: salonId
//                 },
//                 select: {
//                     staffID: true
//                 }
//             });
//             const staffIdOfSalon = findStaffId.map(service => service.staffID);
//             if (!staffIdOfSalon) {
//                 return res.status(400).json({ status: 400, error: 'Inputs not found' });
//             } else {
//                 for (let i = 0; i < staffIdOfSalon.length; i++) {
//                     const findBlocks = await prisma.timeBlocks.findMany({
//                         where: {
//                             staffId: staffIdOfSalon[i],
//                             status: true
//                         },
//                         select: {
//                             date: true,
//                             duration: true,
//                             time: true,
//                             customerId: true,
//                             serviceId: true
//                         }
//                     });
//                     res.status(200).json(findBlocks); 
//                 }
//             }
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: 500, error: 'Failed to process' });
//     } finally {
//         await prisma.$disconnect();
//     }
// }