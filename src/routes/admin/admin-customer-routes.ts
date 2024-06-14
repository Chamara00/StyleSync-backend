import { Router } from 'express';
import { getAllCustomers } from '../../controllers/admin/customers/get-all-customets';

export function configureAdminCustomerRoutes(router: Router): void {
    router.get('/get-all-customers', getAllCustomers);
    
}