import { Router } from 'express';


import { ShowAvailableAppointments } from '../controllers/AppointmentShowToSalon/show-today-appointment-in-home-screen';
import{ShowSelectDateAppointments} from '../controllers/AppointmentShowToSalon/Show-SelectDate-Appoinment';
import{ShowSelectDateCancleAppointments} from '../controllers/AppointmentShowToSalon/Show-SelectDate-Cancled-appoinment';
import{ShowCustomerDetails} from '../controllers/AppointmentShowToSalon/show-Customer-Details';
import{ShowCustomerHistory} from '../controllers/AppointmentShowToSalon/show-Customer-Appoinment-History';
import {RejectAppointment} from '../controllers/AppointmentShowToSalon/reject-appointment';
import{ShowRejectAppointments} from '../controllers/AppointmentShowToSalon/Show-Reject-Appointment';

export function configuregetAppointmentToSalon(router: Router): void{
    router.get('/get-appointment-to-salon',ShowAvailableAppointments);
    router.get('/get-selectedate-appoinment',ShowSelectDateAppointments);
    router.get('/get-selectedate-cancle-appoinment',ShowSelectDateCancleAppointments);
    router.get('/get-customer-details',ShowCustomerDetails);
    router.get('/get-customer-History',ShowCustomerHistory);
    router.get('/get_reject_appointment',ShowRejectAppointments);
    router.put('/reject_appointment', RejectAppointment);
}