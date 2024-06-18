import { Router } from 'express';
import { configureAdminCustomerRoutes } from './admin-customer-routes';
import { configureAdminSalonsRoutes } from './admin-salons-routes';
import { configureAdminServiceRoutes } from './admin-service-routes';
//import { confgureAdminAuthRoutes } from './admin-auth';

export function configureAdminAllRoutes(router: Router): void {
  const customerRouter = Router();
  configureAdminCustomerRoutes(customerRouter);
  router.use('/customer', customerRouter);

  const salonRouter = Router();
  configureAdminSalonsRoutes(salonRouter);
  router.use('/salons', salonRouter);

  const serviceRouter = Router();
  configureAdminServiceRoutes(serviceRouter);
  router.use('/services', serviceRouter);

  // const authRouter = Router();
  // confgureAdminAuthRoutes(authRouter);
  // router.use('/auth', authRouter);
}
