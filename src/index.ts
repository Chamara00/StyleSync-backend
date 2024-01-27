import express from 'express';
import { configureRoutes } from './routes';

const app = express();

configureRoutes(app);

const PORT = process.env.PORT || 8000;

configureRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
