import { Router } from 'express';
import { getAllCustomers, getCustomerById } from '../../controllers/admin/customers/customers';

export function configureAdminCustomerRoutes(router: Router): void {
    router.get('/get-all-customers', getAllCustomers);
    router.get('/getcustomer-by-id/:id', getCustomerById);
}