import { Router } from 'express';
import { registerSalonStep1 } from '../controllers/RegisterSalon/mobile-salon-register';
import { enterAddressForSalon } from '../controllers/RegisterSalon/mobile-salon-enterAddress';
import { enterLocation } from '../controllers/RegisterSalon/mobile-salon-enter-location';
import { confirmLocation } from '../controllers/RegisterSalon/mobile-salon-confirm-location';
import { authenticateToken } from '../middlewares/authMiddleware';
import { verifyEmail } from '../controllers/RegisterSalon/mobile-verify-email';
//import { authenticateAdminToken } from '../middlewares/authMiddleware';

export function configureRegisterRoutes(router: Router): void {
    router.post('/register-salon/step1', registerSalonStep1);
    router.post('/register-salon/verify-email', verifyEmail);
    router.post('/register-salon/address', authenticateToken, enterAddressForSalon);
    router.post('/register-salon/enter-location', authenticateToken, enterLocation);
    router.post('/register-salon/confirm-location', authenticateToken, confirmLocation);
}