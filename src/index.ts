import express from 'express';
import { Request, Response } from 'express';
//import { configureRoutes } from './routes';

const app = express();

app.get('/', ( req: Request, res: Response) => {
    return res.json('Hello world');
});


const PORT = process.env.PORT || 8000;

// configureRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
