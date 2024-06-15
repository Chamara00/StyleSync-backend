import { Router } from 'express';
import { getAllSalons, getSalonById, getSalonCount } from '../../controllers/admin/salons/salons';

export function configureAdminSalonsRoutes(router: Router): void {
  router.get('/get-all-salons', getAllSalons);
  router.get('/get-salon-by-id/:id', getSalonById);
  router.get('/get-salon-count', getSalonCount);
}
