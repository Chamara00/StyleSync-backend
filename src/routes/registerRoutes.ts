import { Router } from 'express';
import { RegisterSalon } from '../controllers/RegisterSalon/mobile-salon-register';
import { Login } from '../controllers/RegisterSalon/mobile-salon-login';
import { AddSalonImage } from '../controllers/RegisterSalon/mobile-add-image';
import {GenerateOTP} from '../controllers/RegisterSalon/generate-Otp';
import {EmailVerified} from '../controllers/RegisterSalon/email-verified';
//import { authenticateAdminToken } from '../middlewares/authMiddleware';

export function configureRegisterRoutes(router: Router): void {
  router.post('/register-salon', RegisterSalon);
  router.get('/salon-login', Login);
  router.put('/update-salon-image', AddSalonImage);
  router.put('/generate-salon-otp',GenerateOTP);
  router.put('/verified-salon-email',EmailVerified);
}
