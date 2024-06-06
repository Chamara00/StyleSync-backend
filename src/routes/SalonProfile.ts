import { Router } from 'express';

import {ShowSalonDetails} from '../controllers/SalonProfile/Show_Salon_Details';
import{SalonAppointmentTodayStatistics } from '../controllers/SalonProfile/SalonAppoinmentTodayStatistics';
import{SalonAppointmentWeekStatistics} from '../controllers/SalonProfile/salonAppoinmentWeekStatistic';

export function configuregetSalonDtails(router: Router): void{
    router.get('/get_salon_details',ShowSalonDetails);
    router.get('/get_salon_appoinment_stat',SalonAppointmentTodayStatistics );
    router.get('/get_salon_Weekappoinment_stat',SalonAppointmentWeekStatistics);
}