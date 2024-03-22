import { Router } from 'express';
 import { ShowAvailableAppointments } from '../controllers/AppointmentShowSalon/show-appointment-in-home-screen';
 import{ShowOngoingAppointments} from '../controllers/AppointmentShowSalon/OngoingAppoinment';
 import{ShowUpComingAppointments} from '../controllers/AppointmentShowSalon/UpComingAppoinment';
 import{ShowPastAppointments} from '../controllers/AppointmentShowSalon/PastAppoinment';

 export function configuregetAppointmentToSalon(router: Router): void{
    router.get('/get-appointment-to-salon',ShowAvailableAppointments);
    router.get('/get-ongoing-appoinment',ShowOngoingAppointments);
    router.get('/get-upcoming-appoinment',ShowUpComingAppointments);
    router.get('/get-past-appoinment',ShowPastAppointments);
 }