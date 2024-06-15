import { Router } from 'express';
import { ShowAvailableCategories } from '../../controllers/CustomerWeb/Show-category';
import { CustomerRegister } from '../../controllers/CustomerWeb/customer-register';

export function ConfigureCustomerHomeRoutes(router: Router): void {
    router.get('/get-all-categories', ShowAvailableCategories);
    router.post('/register-customer',CustomerRegister);
}