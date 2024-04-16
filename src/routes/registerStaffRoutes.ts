import { Router } from 'express';
import { registerStaff } from '../controllers/RegisterStaff/mobile-staff-register';
import {ShowStaffDetails} from '../controllers/RegisterStaff/Show-Staff-Details';

export function configureStaffRoutes(router: Router): void {
    router.post('/register-staff', registerStaff);
    router.get('/show-staff-details', ShowStaffDetails);
}