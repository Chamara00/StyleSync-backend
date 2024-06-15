import { Router } from 'express';
import { createService, deleteService, getAllServies, getServiceById, updateService } from '../../controllers/admin/services/services';

export function configureAdminServiceRoutes(router: Router): void {
    router.post('/create-service', createService);
    router.get('/get-all-services', getAllServies);
    router.get('/get-service-by-id/:id', getServiceById);
    router.put('/update-service/:id', updateService);
    router.delete('/delete-service/:id', deleteService);
}