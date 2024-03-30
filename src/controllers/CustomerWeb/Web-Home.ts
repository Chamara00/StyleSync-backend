import { Request, Response } from 'express';
import { PrismaClient} from '@prisma/client';


const prisma = new PrismaClient();


export async function Home (req: Request, res: Response){

    try{
    //    if (!guestId){
    //     return res.status(400).json({ status: 400, error:'Empty Input Fields'});
    //    }
    {
        const getSalon =  await prisma.salon.findMany({
            select: {
                name: true,
                location:true
            },
        
            // orderBy: {
            //     review:true,
            // }
        });
        return res.status(200).json({ status:200, data: getSalon});

        
    }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Failed to prcoess Search Result'});
    }
    finally{
        await prisma.$disconnect();
    }
}