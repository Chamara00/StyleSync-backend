import { Router } from 'express';
import { Request, Response } from 'express';

export function configurehealthRoutes(router: Router): void {
    router.get('/check', (req: Request, res: Response) => {
        res.status(200).json({ message: 'Server is healthy '});
    });
}