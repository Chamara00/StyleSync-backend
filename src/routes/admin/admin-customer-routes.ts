import { Router } from 'express';
import { getAllCustomers, getCustomerById, getCustomerCount } from '../../controllers/admin/customers/customers';

export function configureAdminCustomerRoutes(router: Router): void {
  router.get('/get-all-customers', getAllCustomers);
  router.get('/getcustomer-by-id/:id', getCustomerById);
  router.get('/get-customer-count', getCustomerCount);
}
