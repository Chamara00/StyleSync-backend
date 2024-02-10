import express from 'express';
// import { Request, Response } from 'express';
//import { configureRoutes } from './routes';
import { registerSalonStep1 } from './controllers/mobile-salon-register';
import { registerStaff } from './controllers/mobile-staff-register';
import {updateOpenHours} from './controllers/mobile-salon-open-hours';
const app = express();

app.use(express.json());

app.post('/register-salon/step1', registerSalonStep1);
app.post('/register-staff', registerStaff);
app.post('/update-open-hours', updateOpenHours);


const PORT = process.env.PORT || 8000;

// configureRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
