import { Router } from 'express';
import {createStaffService } from '../controllers/Services/mobile-staff-service-create';

export function configureopenServicesRoutes(router: Router): void{
    router.post('/staff-service-create',createStaffService);
}
