import { Router } from 'express';
import { RegisterSalon } from '../controllers/RegisterSalon/mobile-salon-register';
import {Login} from '../controllers/RegisterSalon/mobile-salon-login';
//import { authenticateAdminToken } from '../middlewares/authMiddleware';

export function configureRegisterRoutes(router: Router): void {
    router.post('/register-salon', RegisterSalon);
    router.get('/salon-login',Login);
}

