import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoute } from './app/config/modules/product/product.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application route

app.use('/api', ProductRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello techmart!');
});

console.log(process.cwd());

export default app;
