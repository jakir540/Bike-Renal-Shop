import express from 'express';
import { ProductController } from './product.cotroller';

const route = express.Router();

route.post('/products', ProductController.createProduct);

route.get('/products', ProductController.getAllProductsController);

route.get('/products/:productId', ProductController.getSingleProductController);

route.put('/products/:productId', ProductController.updateProduct);

route.delete('/products/:productId', ProductController.deleteProduct);

export const ProductRoute = route;
