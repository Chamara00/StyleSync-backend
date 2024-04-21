import { Router } from 'express';
import { Home } from '../controllers/CustomerWeb/Web-Home';
//import { RegisterCustomer } from '../controllers/CustomerWeb/customer-register';
import { LoginCustomer } from '../controllers/CustomerWeb/Login';
import { SalonAddManual } from '../controllers/CustomerWeb/Salon-ManualAdd';


//http://localhost:8000/app/v1/customer/show-salon-to-customer
//http://localhost:8000/app/v1/customer/create-customer
//http://localhost:8000/app/v1/customer/customer-login
//http://localhost:8000/app/v1/customer/salon-Manual-Add

export function configureCustomerRoutes(router: Router): void {
    router.post('/show-salon-to-customer', Home);
    //router.post('/create-customer', RegisterCustomer);
    router.post('/customer-login',LoginCustomer);
    router.post('/salon-Manual-Add,',SalonAddManual);
}