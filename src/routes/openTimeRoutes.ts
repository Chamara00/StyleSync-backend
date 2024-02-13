import { Router } from 'express';
import { createOpenHours } from '../controllers/OpenDaysAndHours/mobile-salon-create-open-hours';
import { getOpendaysAndHours } from '../controllers/OpenDaysAndHours/mobile-salon-opendays-and-hours';
import { updateOpenHours } from '../controllers/OpenDaysAndHours/mobile-salon-update-open-and-close-hours';
import { deleteBreaks } from '../controllers/Breaks/mobile-delete-breaks'; 
import { createBreak } from '../controllers/Breaks/mobile-create-salon-breaks'; 
import { getBreaks } from '../controllers/Breaks/mobile-view-salon-breaks';
import { updateBreaks } from '../controllers/Breaks/mobile-salon-update-breaks';

export function configureopenTimeRoutes(router: Router): void {
   router.post('/update-open-hours', createOpenHours);
   router.post('/create-break',createBreak);

    router.get('/get-opendays-and-hours', getOpendaysAndHours);
    router.get('/get-breaks',getBreaks);

    router.put('/update-open-close-hours', updateOpenHours);
    router.put('/update-breaks',updateBreaks);

    router.delete('/delete-break', deleteBreaks);
    
}