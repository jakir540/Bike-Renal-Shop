import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application route

// application routes
app.use('/api', router);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found ',
  });
});

export default app;
