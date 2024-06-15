import { Router } from 'express';
import { getAllSalons, getSalonById } from '../../controllers/admin/salons/salons';

export function configureAdminSalonsRoutes(router: Router): void {
    router.get('/get-all-salons', getAllSalons);
    router.get('/get-salon-by-id/:id', getSalonById);
}