import { Request, Response } from 'express';

export async function confirmLocation (req: Request, res: Response){
    const { id, location, newLocation } = req.body;

    try{
        if(!id || !location || !newLocation){
            return res.status(400).json({ error: 'Invalid input format' });
        }

        if(location == newLocation){
            return res.status(200).json({message: 'Location is correct', id});
        } else{
            return res.status(400).json({ error: 'Location is incorrect'});
        }
    }
    catch(error){
        console.log(error);
    }
}