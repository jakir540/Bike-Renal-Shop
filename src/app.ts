import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFountRoutes from './app/middleware/notFoundRoute';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

//server route
app.get('/', (req: Request, res: Response) => {
  res.send('welcome to bike booking shop');
});
// not found route
app.use(notFountRoutes);

// error handling full project
app.use(globalErrorHandler);

export default app;
