import { Router } from 'express';
// import { createOpenHours } from '../controllers/OpenDaysAndHours/Create/mobile-salon-create-open-hours';
// import { getOpendaysAndHours } from '../controllers/OpenDaysAndHours/View/mobile-salon-opendays-and-hours';
// import { updateOpenHours } from '../controllers/OpenDaysAndHours/Update/mobile-salon-update-open-and-close-hours';
import { deleteBreaks } from '../controllers/Breaks/Delete/mobile-delete-breaks'; 
import { createBreak } from '../controllers/Breaks/Create/mobile-create-salon-breaks'; 
import { getBreaks } from '../controllers/Breaks/View/mobile-view-salon-breaks';
import { updateBreaks } from '../controllers/Breaks/Update/mobile-salon-update-breaks';
import { createOpenHours } from '../controllers/OpenDaysAndHours/Create/mobile-salon-create-open-hours';

export function configureopenTimeRoutes(router: Router): void {

   router.post('/create-open-hours', createOpenHours);

   router.post('/create-break',createBreak);

    // router.get('/get-opendays-and-hours', getOpendaysAndHours);
    router.get('/get-breaks',getBreaks);

    // router.put('/update-open-close-hours', updateOpenHours);
    router.put('/update-breaks',updateBreaks);

    router.delete('/delete-break', deleteBreaks);
    
}