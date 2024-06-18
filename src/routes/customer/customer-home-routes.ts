import { Router } from 'express';
import { ShowAvailableCategories } from '../../controllers/CustomerWeb/Show-category';
import { CustomerRegister } from '../../controllers/CustomerWeb/customer-register';
import { LoginCustomer } from '../../controllers/CustomerWeb/Login';
import { SalonsAvailableCategories } from '../../controllers/CustomerWeb/show-salons-available-categories';
import { SalonsUnderCategories } from '../../controllers/CustomerWeb/show-salons-under-category';
import { SalonDetails } from '../../controllers/CustomerWeb/get-salon-details';
import { SalonsAvailableServices } from '../../controllers/CustomerWeb/show-services-under-categories';
import { SalonsUnderService } from '../../controllers/CustomerWeb/show-salons-under-service';
import { StaffOfSalon } from '../../controllers/CustomerWeb/get-staff-of-salon';
import { ServiceOfStaff } from '../../controllers/CustomerWeb/get-staff-services';
import { StaffAvailability } from '../../controllers/CustomerWeb/get-staff-available-time-and-service-duration';

export function ConfigureCustomerHomeRoutes(router: Router): void {
    router.get('/get-all-categories', ShowAvailableCategories);
    router.post('/register-customer',CustomerRegister);
    router.post('/login-customer',LoginCustomer);
    router.get('/show-salons-available-categories',SalonsAvailableCategories);
    router.get('/show-salons-under-categories',SalonsUnderCategories);
    router.get('/get-salon-details',SalonDetails);
    router.get('/show-salons-available-services',SalonsAvailableServices);
    router.get('/show-salons-under-service',SalonsUnderService);
    router.get('/get-staff-details',StaffOfSalon);
    router.get('/get-service-of-staff',ServiceOfStaff);
    router.get('/staff-available-time',StaffAvailability);
}