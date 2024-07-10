import { Router } from 'express';
import { NewNotification} from '../controllers/Notification/mobile-new-notification';
import { OldNotification } from '../controllers/Notification/mobile-old-notification';
import {getStaffNotificationAvailability} from '../controllers/Notification/getStaffNotificationAvailability';
import {UpdateStaffNotificationAvailability} from '../controllers/Notification/UpdateStaffNotificationAvailability';
import {salonNotificationAvailability} from '../controllers/Notification/salonNotificationAvailability';
import {UpdateSalonNotification} from '../controllers/Notification/UpdateSalonNotification';

export function configureNotification(router: Router): void{
    router.get('/get_new_appoinment',NewNotification);
    router.get('/get_old_appoinment',OldNotification);
    router.get('/getStaffNotificationAvailability',getStaffNotificationAvailability);
    router.put('/UpdateStaffNotificationAvailability',UpdateStaffNotificationAvailability);
    router.get('/salonNotificationAvailability',salonNotificationAvailability);
    router.put('/UpdateSalonNotification',UpdateSalonNotification);
    

}