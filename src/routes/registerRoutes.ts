import { Router } from 'express';
import { RegisterSalon } from '../controllers/RegisterSalon/mobile-salon-register';
//import { authenticateAdminToken } from '../middlewares/authMiddleware';

export function configureRegisterRoutes(router: Router): void {
  router.post('/register-salon', RegisterSalon);
}
