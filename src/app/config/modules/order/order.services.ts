// import { OrderRequest } from './order.interface';
import { OrderModel } from './order.model';

// const createOrderIntoDB = async (order) => {
//   const result = await OrderModel.create(order);
//   return result;
// };

const getAllOrders = async () => {
  const allOrder = await OrderModel.find();
  return allOrder;
};

// get order with email
const getOrderByEmail = async (email: string) => {
  try {
    const singleOrder = await OrderModel.find({ email });
    return singleOrder;
  } catch (error) {
    console.log(error);
    throw new Error('order not find in DB');
  }
};

export const orderService = {
  getAllOrders,
  getOrderByEmail,
};
