import { Router } from 'express';
import { getAllSalons } from '../../controllers/admin/salons/get-all-salons';

export function configureAdminSalonsRoutes(router: Router): void {
    router.get('/get-all-salons', getAllSalons);
}