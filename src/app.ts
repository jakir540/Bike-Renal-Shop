import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoute } from './app/config/modules/product/product.route';
import { orderRoute } from './app/config/modules/order/order.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application route

app.use('/api', ProductRoute);
app.use('/api', orderRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello techmart!');
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found ',
  });
});

console.log(process.cwd());

export default app;
