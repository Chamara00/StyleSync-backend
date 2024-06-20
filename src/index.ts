import express from 'express';
import { configureAdminRoutes, configureCustomerRoutes, configureRoutes } from './routes';
import cors from 'cors';

const corsOptions = {
  // origin: ['http://localhost:8000/admin', 'http://localhost:3000'],
  origin: true,
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

configureRoutes(app);
configureAdminRoutes(app);
configureCustomerRoutes(app);
// /app/v1/salon/register-salon/step1
// /app/v1/salon/register-salon/verify-email
// /app/v1/salon/register-salon/address
// /app/v1/salon/register-salon/enter-location
// /app/v1/salon/register-salon/confirm-location

// /app/v1/staff/register-staff

// /app/v1/time/create-open-hours
// /app/v1/time/create-break
// /app/v1/time/get-opendays-and-hours
// /app/v1/time/update-open-close-hours
// /app/v1/time/update-breaks
// /app/v1/time/delete-break

// /app/v1/health/check

// Admin routes
// /admin/customer/get-all-customers
// /admin/customer/getcustomer-by-id/:id
// /admin/salons/get-all-salons
// /admin/salons/get-salon-by-id/:id
// /admin/services/create-service
// /admin/services/get-all-servies
// admin/servies/get-service-by-id/:id
// /admin/services/update-service/:id
// /admin/services/delete-service/:id

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
