import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function Login(req: Request, res: Response) {
    const { email, password } = req.query;

    try {
        if (!email || !password) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }

        const loginSalon = await prisma.salon.findMany({
            where: {
                email:String(email),
                password:String(password)
             },
             select:{
                id:true,
             }
            
        });
        const staffCount = await prisma.salonStaff.aggregate({
            where:{
                salonId:loginSalon[0].id,
            },
            _count:{
                staffID:true
            }
          });

        return res.status(201).json({ status: 201, message: 'Login Successfully', data:loginSalon, count:staffCount  });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
}
