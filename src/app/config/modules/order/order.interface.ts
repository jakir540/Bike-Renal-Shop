import mongoose from 'mongoose';

export type OrderRequest = {
  email: string;
  // productId: string;
  productId: mongoose.Schema.Types.ObjectId;
  price: number;
  quantity: number;
};
