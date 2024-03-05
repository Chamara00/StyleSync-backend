import express from 'express';
import { configureRoutes } from './routes';

const app = express();

configureRoutes(app);
// /app/v1/salon/register-salon/step1
// /app/v1/salon/register-salon/address
// /app/v1/salon/register-salon/enter-location
// /app/v1/salon/register-salon/confirm-location
 
// /app/v1/staff/register-staff

// /app/v1/time/update-open-hours
// /app/v1/time/create-break
// /app/v1/time/get-opendays-and-hours
// /app/v1/time/update-open-close-hours
// /app/v1/time/update-breaks
// /app/v1/time/delete-break

// /app/v1/health/check

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;