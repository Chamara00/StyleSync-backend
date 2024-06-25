import { Router } from 'express';
//import { Home } from '../controllers/CustomerWeb/FirstPage';
//import { RegisterCustomer } from '../controllers/CustomerWeb/customer-register';
import { LoginCustomer } from '../controllers/CustomerWeb/Login';
//import { SalonAddManual } from '../controllers/CustomerWeb/Salon-ManualAdd';
import { SearchResult } from '../controllers/CustomerWeb/Search-salon';
import { FirstPage } from '../controllers/CustomerWeb/FirstPage';
import { ShowAvailableCategories } from '../controllers/CustomerWeb/Show-category';
//mport { RegisterCustomer } from '../controllers/CustomerWeb/customer-register';
// import { AppointmentSchedule } from '../controllers/CustomerWeb/AppointmentSchedule';

//http://localhost:8000/app/v1/customer/show-salon-to-customer
//http://localhost:8000/app/v1/customer/create-customer
//http://localhost:8000/app/v1/customer/customer-login
//http://localhost:8000/app/v1/customer/salon-Manual-Add
//http://localhost:8000/app/v1/customer/search-salon

//https://stylesync-backend-test.onrender.com/app/v1/time/create-open-hours

export function configureCustomerRoutes(router: Router): void {
  //router.post('/show-salon-to-customer', Home);
  //router.post('/create-customer', RegisterCustomer);
  router.post('/customer-login', LoginCustomer);
  //router.post('/salon-Manual-Add', SalonAddManual);
  router.get('/search-salon', SearchResult);
  router.get('/Home-Page', FirstPage);
  router.get('/get-all-categories', ShowAvailableCategories);
  // router.post('Appointment-Schedule',AppointmentSchedule);
}
