import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function RegisterCustomer(req: Request, res: Response) {
    const { email, password, confirmPassword, name } = req.body;//request from body

    try {
        if (!email || !password || !confirmPassword || !name) {
            return res.status(400).json({ status: 400, error: 'Invalid input format' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ status: 400, error: 'Passwords do not match' });
        }
        const userExist = await prisma.customer.findUnique({
            where: { email }
        });

        if (userExist) {
            return res.status(400).json({ status: 400, error: 'User with this email already exists' });
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const register = await prisma.customer.create({
                data: {
                    name: String(name),
                    email: String(email),
                    password: String(hashedPassword)
                }
            });
    
            return res.status(201).json({ status: 201, message: 'Customer Registration successful', data:register });
        }

        

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to process Registration' });
    } finally {
        await prisma.$disconnect();
    }
}
