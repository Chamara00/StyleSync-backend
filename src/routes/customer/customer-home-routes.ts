import { Router } from 'express';
import { ShowAvailableCategories } from '../../controllers/CustomerWeb/Show-category';

export function ConfigureCustomerHomeRoutes(router: Router): void {
    router.get('/get-all-categories', ShowAvailableCategories);
}