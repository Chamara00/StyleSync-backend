import { Router } from 'express';
import { RegisterSalon } from '../controllers/RegisterSalon/mobile-salon-register';
import {Login} from '../controllers/RegisterSalon/mobile-salon-login';
import { AddSalonImage } from '../controllers/RegisterSalon/mobile-salon-add-image';
import multer from 'multer';
//import { authenticateAdminToken } from '../middlewares/authMiddleware';
const upload = multer({ dest: '../assets' });

export function configureRegisterRoutes(router: Router): void {
    router.post('/register-salon', RegisterSalon);
    router.get('/salon-login',Login);
    router.put('/add-salon-image',AddSalonImage,upload.single('salonImage'));
}

