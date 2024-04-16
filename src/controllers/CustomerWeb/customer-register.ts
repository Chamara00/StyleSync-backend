//Customer Register Using Web

// import { Request, Response } from 'express';
// import { PrismaClient} from '@prisma/client';


// const prisma = new PrismaClient();

// export async function registerCustomer(req: Request, res: Response){
//     const { email, password, confirmPassword} = req.body;

//     try{
//         if (!email || !password || !confirmPassword){
//             return res.status(400).json({ status: 400, error:'Invlid input format'});
//         }
//         if (password !== confirmPassword){
//             return res.status(400).json({ status: 400, error:'Password are not match'});
//         }
//         const userExist = await prisma.customer.findUnique({
//             where: {email}
//         });
//         if (userExist){
//             return res.status(400).json({ status: 400, error: 'User with this email already exisits'});
//         }
        
//             await prisma.customer.create({
//             data : {
//                 email,
//                 password
//             },
//         });

//         return res.status(201).json({ status: 201, message: 'Customer Registraion successful'});
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({ status: 500, error: 'Failed to prcoess Registration'});
//     }
//     finally{
//         await prisma.$disconnect();
//     }
// }