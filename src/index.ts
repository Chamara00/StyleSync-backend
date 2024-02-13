import express from 'express';

// import { Request, Response } from 'express';
//import { configureRoutes } from './routes';
//import { registerSalonStep1 } from './controllers/mobile-salon-register';
import { registerStaff } from './controllers/RegisterStaff/mobile-staff-register';
import {createOpenHours} from './controllers/OpenDaysAndHours/mobile-salon-create-open-hours';
import { getOpendaysAndHours } from './controllers/OpenDaysAndHours/mobile-salon-opendays-and-hours';
import { updateOpenHours } from './controllers/OpenDaysAndHours/mobile-salon-update-open-and-close-hours';
import { deleteBreaks } from './controllers/Breaks/mobile-delete-breaks'; 
import { createBreak } from './controllers/Breaks/mobile-create-salon-breaks'; 
import { getBreaks } from './controllers/Breaks/mobile-view-salon-breaks';
import { updateBreaks } from './controllers/Breaks/mobile-salon-update-breaks';
import { createNewService } from './controllers/Services/admin-store-services';
import  { createStaffService } from './controllers/Services/mobile-staff-service-create';
//import { getServiceType } from './controllers/Services/View/mobile-view-staff-service-type';
import { getAllServiceType } from './controllers/Services/View/mobile-view-service-type';
import { configureRoutes } from './routes';

const app = express();

configureRoutes(app);
// /app/v1/salon/register-salon/step1
// /app/v1/salon/register-salon/address
// /app/v1/sHEADalon/register-salon/enter-location
// /app/v1/salon/register-salon/confirm-location
 
// /app/v1/staff/register-staff

//app.post('/register-salon/step1', registerSalonStep1);
app.post('/register-staff', registerStaff);
app.post('/update-open-hours', createOpenHours);
app.post('/create-break',createBreak);
app.post('/create-new-service', createNewService);
app.get('/create-staff-service', createStaffService);

app.get('/get-opendays-and-hours', getOpendaysAndHours);
app.get('/get-breaks',getBreaks);
app.get('/get-all-service-type',getAllServiceType);
//app.get('/get-staff-service-types',getServiceType);

app.put('/update-open-close-hours', updateOpenHours);
app.put('/update-breaks',updateBreaks);

app.delete('/delete-break', deleteBreaks);
// /app/v1/time/update-open-hours
// /app/v1/time/create-break
// /app/v1/time/get-opendays-and-hours
// /app/v1/time/update-open-close-hours
// /app/v1/time/update-breaks
// /app/v1/time/delete-break

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;