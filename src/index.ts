import express from 'express';
// import { Request, Response } from 'express';
//import { configureRoutes } from './routes';
import { registerSalonStep1 } from './controllers/mobile-salon-register';
import { registerStaff } from './controllers/RegisterStaff/mobile-staff-register';
import {createOpenHours} from './controllers/OpenDaysAndHours/mobile-salon-create-open-hours';
import { getOpendaysAndHours } from './controllers/OpenDaysAndHours/mobile-salon-opendays-and-hours';
import { updateOpenHours } from './controllers/OpenDaysAndHours/mobile-salon-update-open-and-close-hours';
import { deleteBreaks } from './controllers/Breaks/mobile-delete-breaks'; 
import { createBreak } from './controllers/Breaks/mobile-create-salon-breaks'; 
import { getBreaks } from './controllers/Breaks/mobile-view-salon-breaks';
import { updateBreaks } from './controllers/Breaks/mobile-salon-update-breaks';
const app = express();

app.use(express.json());

app.post('/register-salon/step1', registerSalonStep1);
app.post('/register-staff', registerStaff);
app.post('/update-open-hours', createOpenHours);
app.post('/create-break',createBreak);

app.get('/get-opendays-and-hours', getOpendaysAndHours);
app.get('/get-breaks',getBreaks);

app.put('/update-open-close-hours', updateOpenHours);
app.put('/update-breaks',updateBreaks);

app.delete('/delete-break', deleteBreaks);

const PORT = process.env.PORT || 8000;

// configureRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
