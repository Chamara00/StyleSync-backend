import { Router } from 'express';
import { configureRegisterRoutes } from '../../registerRoutes';
import { configureStaffRoutes } from '../../registerStaffRoutes';
import { configureopenTimeRoutes } from '../../openTimeRoutes';
import { configureopenServicesRoutes } from '../../openServiceRoutes';
import { configurehealthRoutes } from '../../healthRoute';
import { configuregetAppointmentToSalon } from '../../getAppointmentsToSalon';
import{configuregetSalonDtails} from '../../SalonProfile';
//import {configureNotification} from '../../Notification';


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

    const getAppointmentToSalon = Router();
    configuregetAppointmentToSalon(getAppointmentToSalon);
    router.use('/appointment',getAppointmentToSalon);

    const healthRoute = Router();
    configurehealthRoutes(healthRoute);
    router.use('/health', healthRoute);
    
    const salonProfileRoutes = Router();
    configuregetSalonDtails(salonProfileRoutes);
    router.use('/SalonProfile',salonProfileRoutes);

    // const Notification = Router();
    // configureNotification(Notification);
    // router.use('/notification',Notification );

}