import { Router } from 'express';


import { ShowAvailableAppointments } from '../controllers/AppointmentShowToSalon/show-today-appointment-in-home-screen';
import{ShowOngoingAppointments} from '../controllers/AppointmentShowToSalon/Show-Today-Ongoing-Appoinment';
import{ ShowPastAppointments} from '../controllers/AppointmentShowToSalon/Show-Today-Past-Appoinment';
import{ShowCancleAppointments} from '../controllers/AppointmentShowToSalon/Show-Today-Cancle-Appoinment';
import{ShowUpComingAppointments} from '../controllers/AppointmentShowToSalon/Show-Today-Upcoming-Appoinment';
import{ShowSelectDateAppointments} from '../controllers/AppointmentShowToSalon/Show-SelectDate-Appoinment';
import{ShowSelectDateCancleAppointments} from '../controllers/AppointmentShowToSalon/Show-SelectDate-Cancled-appoinment';
import{ShowCustomerDetails} from '../controllers/AppointmentShowToSalon/show-Customer-Details';

export function configuregetAppointmentToSalon(router: Router): void{
    router.get('/get-appointment-to-salon',ShowAvailableAppointments);
    router.get('/get-ongoing-appoinment',ShowOngoingAppointments);
    router.get('/get-upcoming-appoinment',ShowUpComingAppointments);
    router.get('/get-past-appoinment',ShowPastAppointments);
    router.get('/get-cancle-appoinment',ShowCancleAppointments);
    router.get('/get-selectedate-appoinment',ShowSelectDateAppointments);
    router.get('/get-selectedate-cancle-appoinment',ShowSelectDateCancleAppointments);
    router.get('/get-customer-details',ShowCustomerDetails);
}