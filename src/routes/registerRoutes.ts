import { Router } from 'express';
import { RegisterSalon } from '../controllers/RegisterSalon/mobile-salon-register';
import { Login } from '../controllers/RegisterSalon/mobile-salon-login';
import { AddSalonImage } from '../controllers/RegisterSalon/mobile-add-image';
import {GenerateOTP} from '../controllers/RegisterSalon/generate-Otp';
import {EmailVerified} from '../controllers/RegisterSalon/email-verified';
import {ChangePassword} from '../controllers/RegisterSalon/ChangePassword';
import{ForgotPasswordGenerateOTP} from '../controllers/RegisterSalon/ForgotPasswordGenerateOtp';
import {updateEmail} from '../controllers/RegisterSalon/UpdateEmail';
//import { authenticateAdminToken } from '../middlewares/authMiddleware';

export function configureRegisterRoutes(router: Router): void {
  router.post('/register-salon', RegisterSalon);
  router.get('/salon-login', Login);
  router.put('/update-salon-image', AddSalonImage);
  router.put('/generate-salon-otp',GenerateOTP);
  router.put('/verified-salon-email',EmailVerified);
  router.put('/change-salon-password',ChangePassword);
  router.put('/generate-salon-forgotPassword-otp',ForgotPasswordGenerateOTP);
  router.put('/update-salon-email',updateEmail);
}
