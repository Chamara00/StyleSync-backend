import { Router } from 'express';
import { registerStaff } from '../controllers/RegisterStaff/mobile-staff-register';
import {ShowStaffDetails} from '../controllers/RegisterStaff/Show-Staff-Details';
import { ShowStaffList } from '../controllers/RegisterStaff/mobile-show-staff-list';
import { AddStaffImage } from '../controllers/RegisterSalon/mobile-add-staff-image';

export function configureStaffRoutes(router: Router): void {
    router.post('/register-staff', registerStaff);
    router.get('/show-staff-details', ShowStaffDetails);
    router.get('/show-staff-list', ShowStaffList);
    router.put('/update-staff-image',AddStaffImage);
}