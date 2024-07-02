import { Router } from 'express';
import { NewNotification} from '../controllers/Notification/mobile-new-notification';
import { OldNotification } from '../controllers/Notification/mobile-old-notification';

export function configureNotification(router: Router): void{
    router.get('/get_new_appoinment',NewNotification);
    router.get('/get_old_appoinment',OldNotification);

}