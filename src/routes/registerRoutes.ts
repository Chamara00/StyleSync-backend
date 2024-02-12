import { Router } from 'express';
import { registerSalonStep1 } from '../controllers/RegisterSalon/mobile-salon-register';
import { enterAddressForSalon } from '../controllers/RegisterSalon/mobile-salon-enterAddress';
import { enterLocation } from '../controllers/RegisterSalon/mobile-salon-enter-location';
import { confirmLocation } from '../controllers/RegisterSalon/mobile-salon-confirm-location';

export function configureRegisterRoutes(router: Router): void {
    router.post('/register-salon/step1', registerSalonStep1);
    router.post('/register-salon/address', enterAddressForSalon);
    router.post('/register-salon/enter-location', enterLocation);
    router.post('/register-salon/confirm-location', confirmLocation);
}