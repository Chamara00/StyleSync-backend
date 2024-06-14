import { Router } from 'express';
import { configureAdminCustomerRoutes } from './admin-customer-routes';
import { configureAdminSalonsRoutes } from './admin-salons-routes';

export function configureAdminAllRoutes(router: Router): void {
    const customerRouter = Router();
    configureAdminCustomerRoutes(customerRouter);
    router.use('/customer', customerRouter);

    const salonRouter = Router();
    configureAdminSalonsRoutes(salonRouter);
    router.use('/salons', salonRouter);
}