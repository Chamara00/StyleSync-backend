import { Router } from 'express';
import { configureRegisterRoutes } from '../../registerRoutes';
import { configureStaffRoutes } from '../../registerStaffRoutes';
import { configureopenTimeRoutes } from '../../openTimeRoutes';
import { configureopenServicesRoutes } from '../../openServiceRoutes';
import { configurehealthRoutes } from '../../healthRoute';


export function configureV1Routes(router: Router): void {
    const registerSalonRouter = Router();
    configureRegisterRoutes(registerSalonRouter);
    router.use('/salon', registerSalonRouter);

    const registerStaffRouter = Router();
    configureStaffRoutes(registerStaffRouter);
    router.use('/staff', registerStaffRouter);

    const openTimesRouter = Router();
    configureopenTimeRoutes(openTimesRouter);
    router.use('/time', openTimesRouter);

    const openServiceRoutes = Router();
    configureopenServicesRoutes(openServiceRoutes);
    router.use('/service',openServiceRoutes);

    const healthRoute = Router();
    configurehealthRoutes(healthRoute);
    router.use('/health', healthRoute);
}