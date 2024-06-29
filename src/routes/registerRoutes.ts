import { Router } from 'express';
<<<<<<< HEAD
import { registerSalonStep1 } from '../controllers/RegisterSalon/mobile-salon-register';
import { enterAddressForSalon } from '../controllers/RegisterSalon/mobile-salon-enterAddress';
import { enterLocation } from '../controllers/RegisterSalon/mobile-salon-enter-location';
import { confirmLocation } from '../controllers/RegisterSalon/mobile-salon-confirm-location';
//import { authenticateToken } from '../middlewares/authMiddleware';
import { verifyEmail } from '../controllers/RegisterSalon/mobile-verify-email';
=======
import { RegisterSalon } from '../controllers/RegisterSalon/mobile-salon-register';
import {Login} from '../controllers/RegisterSalon/mobile-salon-login';
import { AddSalonImage } from '../controllers/RegisterSalon/mobile-add-image';
>>>>>>> 734fc13806c50ac1da7113c4c983a9a716721b16
//import { authenticateAdminToken } from '../middlewares/authMiddleware';


export function configureRegisterRoutes(router: Router): void {
<<<<<<< HEAD
  router.post('/register-salon/step1', registerSalonStep1);
  router.post('/register-salon/verify-email', verifyEmail);
  router.post('/register-salon/address', enterAddressForSalon);
  router.post('/register-salon/enter-location', enterLocation);
  router.post('/register-salon/confirm-location', confirmLocation);
}
=======
    router.post('/register-salon', RegisterSalon);
    router.get('/salon-login',Login);
    router.put('/update-salon-image',AddSalonImage);
}

>>>>>>> 734fc13806c50ac1da7113c4c983a9a716721b16
