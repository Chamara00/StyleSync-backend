import { Router } from 'express';

import {ShowSalonDetails} from '../controllers/SalonProfile/Show_Salon_Details';
import{SalonAppointmentTodayStatistics } from '../controllers/SalonProfile/Statistics/SalonAppoinmentTodayStatistics';
import{SalonAppointmentWeekStatistics} from '../controllers/SalonProfile/Statistics/salonAppoinmentWeekStatistic';
import{updateSalonAddress} from '../controllers/SalonProfile/Settings/updateSalonAddress';
import{ShowSalonAddresssforEdit } from '../controllers/SalonProfile/Settings/showSalonAddress';
import{updateSalonProfileDetails} from '../controllers/SalonProfile/Settings/updateSalonDetails';
import{ShowSalonProfileDetails} from '../controllers/SalonProfile/Settings/showSalonProfile';
import{ShowSalonLogin} from '../controllers/SalonProfile/Settings/showSalonConfirmationInformation';
import{updateSalonConfirmationInformation} from '../controllers/SalonProfile/Settings/updateSalonConfirmationInformation';
import{ShowSalonStaffMenbers}  from '../controllers/SalonProfile/Settings/EditStaffMembersProfile/ShowStaffMembers';
import{ShowStaffMemberProfile} from '../controllers/SalonProfile/Settings/EditStaffMembersProfile/showStaffMemberProfile';
import{ updatStaffMemberProfile} from '../controllers/SalonProfile/Settings/EditStaffMembersProfile/updateStaffMemberProfile';
import{ShowService} from '../controllers/SalonProfile/Settings/EditStaffMembersProfile/showService';
import { GetSalonLocation } from '../controllers/SalonProfile/Settings/get-salon-location';
import { updateLocation } from '../controllers/SalonProfile/Settings/update-salon-location';

export function configuregetSalonDtails(router: Router): void{
    router.get('/get_salon_details',ShowSalonDetails);
    router.get('/get_salon_appoinment_stat',SalonAppointmentTodayStatistics );
    router.get('/get_salon_Weekappoinment_stat',SalonAppointmentWeekStatistics);

    router.put('/Update_salon-address',updateSalonAddress);
    router.get('/get_salon-address',ShowSalonAddresssforEdit );
    router.put('/Update_salon-profile',updateSalonProfileDetails);
    router.get('/get_salon-profileDetails',ShowSalonProfileDetails );
    router.put('/Update_salon-ConfirmationInformation',updateSalonConfirmationInformation);
    router.get('/get-salon-login-info',ShowSalonLogin);
    router.get('/get-salon-location',GetSalonLocation);
    router.put('/update-location',updateLocation);

    //staff member edit details
    router.get('/get_salon_staff_members',ShowSalonStaffMenbers );
    router.get('/get_staff_member_profileDetails',ShowStaffMemberProfile);
    router.put('/Update_staff_member_profileDetails', updatStaffMemberProfile);
    router.get('/get_staff_members_Service',ShowService );
    

}