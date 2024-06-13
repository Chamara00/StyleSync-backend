import { Router } from 'express';

import {ShowSalonDetails} from '../controllers/SalonProfile/Show_Salon_Details';
import{SalonAppointmentTodayStatistics } from '../controllers/SalonProfile/Statistics/SalonAppoinmentTodayStatistics';
import{SalonAppointmentWeekStatistics} from '../controllers/SalonProfile/Statistics/salonAppoinmentWeekStatistic';
import{updateSalonAddress} from '../controllers/SalonProfile/Settings/updateSalonAddress';
import{ShowSalonAddresssforEdit } from '../controllers/SalonProfile/Settings/showSalonAddress';

export function configuregetSalonDtails(router: Router): void{
    router.get('/get_salon_details',ShowSalonDetails);
    router.get('/get_salon_appoinment_stat',SalonAppointmentTodayStatistics );
    router.get('/get_salon_Weekappoinment_stat',SalonAppointmentWeekStatistics);

    router.put('/Update_salon-address',updateSalonAddress);
    router.get('/get_salon-address',ShowSalonAddresssforEdit );
}