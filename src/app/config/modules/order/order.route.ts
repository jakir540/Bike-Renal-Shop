import express from 'express';
import { orderController } from './order.controller';

const route = express.Router();

route.post('/orders', orderController.createOrder);

route.get('/orders', orderController.getAllOrdersController);

route.get('/orders/search', orderController.getOrderByEmailController);

// router.post('/orders', createOrder);
// router.get('/orders', getAllOrders);
// router.get('/orders/search', getOrdersByEmail);

export const ProductRoute = route;

export const orderRoute = route;
