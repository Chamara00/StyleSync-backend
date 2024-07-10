import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../../utils/jwtUtils';
const prisma = new PrismaClient();

export async function ChangePassword(req: Request, res: Response) {
    const { email, otp,password } = req.body;

    try{
        if (!otp || !email || !password){
            return res.status(400).json({ status: 400, error:'Invlid input format'});
        }
        const salon = await prisma.salon.findUnique({
            where: { email }
        });

        if (!salon) {
            return res.status(404).json({ status: 404, error: 'Salon not found' });
        }

        if (salon?.otp !== otp ){
            return res.status(400).json({ status: 400, error: 'Invalid OTP' });
        }

        await prisma.salon.update({
            where: { email :email,
                     otp: otp
             },
            data: { password:password}
        });

        const token = generateToken({ id: salon.id, email: salon.email });
        return res.status(200).json({ status: 200, message: 'Change password successfully', token });
    }
    catch (error: unknown) {
        if (error instanceof Error) {
          res.status(400).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
      finally {
        prisma.$disconnect;
      }
}