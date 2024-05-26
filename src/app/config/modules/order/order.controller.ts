import Joi from 'joi';
import { orderService } from './order.services';
import { Request, Response } from 'express';
import { ProductModel } from '../product/product.model';
import { OrderModel } from './order.model';

const orderValidationSchema = Joi.object({
  productId: Joi.string().required(),
  email: Joi.string().email().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

const createOrder = async (req: Request, res: Response) => {
  const order = req.body;
  const { error } = orderValidationSchema.validate(order);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: error.details,
    });
  }

  try {
    const product = await ProductModel.findById(order.productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Product Not Found',
      });
    }

    if (product.inventory.quantity < order.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    product.inventory.quantity -= order.quantity;

    product.inventory.inStock = product.inventory.quantity > 0;

    // const result = await orderService.createOrderIntoDB(order);

    const result = await OrderModel.create(order);

    return res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// get all order functionality

const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getAllOrders();
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
// get specific order by email functionality

const getOrderByEmailController = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email query parameter is required',
      });
    }
    // get all order functionality
    const order = await orderService.getOrderByEmail(email as string);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: order,
    });
  } catch (error) {
    console.log(error);
  }
};

export const orderController = {
  createOrder,
  getAllOrdersController,
  getOrderByEmailController,
};
