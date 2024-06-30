import { Router } from 'express';
import {createStaffService } from '../controllers/Services/Create/mobile-staff-service-create';
import { getStaffServiceType } from '../controllers/Services/View/mobile-view-staff-service-type';
import { getServiceInfo } from '../controllers/Services/View/mobile-view-staff-service-info';
import { getAllServiceType } from '../controllers/Services/View/mobile-view-service-type';
import { deleteStaffService } from '../controllers/Services/Delete/mobile-staff-service-delete';
import { updateStaffServiceInfo } from '../controllers/Services/Update/mobile-staff-service-update';
import { deleteStaffServiceType } from '../controllers/Services/Delete/mobile-staff-service-type-delete';
import { getServiceType } from '../controllers/Services/View/mobile-view-staff-services';
import {createNewService} from '../controllers/Services/Create/mobile-create-new-services';

export function configureopenServicesRoutes(router: Router): void{
    router.post('/staff-service-create',createStaffService);
    router.get('/view-staff-service-type',getStaffServiceType);
    router.get('/get-staff-service-info', getServiceInfo);
    router.get('/get-staff-services', getServiceType);
    router.get('/get-all-service-type', getAllServiceType);
    router.delete('/delete-staff-service', deleteStaffService);
    router.delete('/delete-staff-service-type', deleteStaffServiceType);
    router.put('/update-staff-service-info', updateStaffServiceInfo);
    router.post('/staff-new-service-create',createNewService);

}
