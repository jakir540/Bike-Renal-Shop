import mongoose, { Schema, model } from 'mongoose';

import { OrderRequest } from './order.interface';

const OrderSchema = new Schema<OrderRequest>({
  email: { type: String, required: true },
  // productId: { type: String, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const OrderModel = model<OrderRequest>('Order', OrderSchema);
