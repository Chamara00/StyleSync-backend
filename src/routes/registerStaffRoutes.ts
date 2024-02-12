import { Router } from 'express';
import { registerStaff } from '../controllers/RegisterStaff/mobile-staff-register';

export function configureStaffRoutes(router: Router): void {
    router.post('/register-staff', registerStaff);
}