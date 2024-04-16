// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function SelectSalon(req: Request, res: Response) {
//     try {
//         const { salonId } = req.body; // Assuming the frontend sends the salonId when selecting a salon
        
//         if (!salonId) {
//             return res.status(400).json({ status: 400, error: 'Salon ID is required' });
//         }

//         const salon = await prisma.salon.findUnique({
//             where: {
//                 id: salonId,
//             },
//             include: {
//                 salonStaff: {
//                     include: {
//                         staff: true,
//                     },
//                 },
//                 service: true,
//             },
//         });

//         if (!salon) {
//             return res.status(404).json({ status: 404, error: 'Salon not found' });
//         }

//         // Extracting required details from the salon object
//         const { name, description, contactNo, location, line1, line2, openDays, salonStaff, service } = salon;

//         // Extracting staff names from salonStaff
//         const staffNames = salonStaff.map(({ staff }) => staff.name);

//         // Extracting service names from services
//         const serviceNames = service.map(({ name }) => name);

//         // Constructing the response object
//         const responseData = {
//             name,
//             description,
//             contactNo,
//             location,
//             line1,
//             line2,
//             openDays,
//             staffNames,
//             serviceNames,
//         };

//         return res.status(200).json({ status: 200, data: responseData });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ status: 500, error: 'Failed to process salon details' });
//     } finally {
//         await prisma.$disconnect();
//     }
// }
