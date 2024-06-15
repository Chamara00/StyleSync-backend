import { Router } from 'express';
import { ConfigureCustomerHomeRoutes } from './customer-home-routes';

export function ConfigureAllCustomerRoutes(router: Router): void{
    const customerRouter = Router();
    ConfigureCustomerHomeRoutes(customerRouter);
    router.use('/customer', customerRouter);

}
