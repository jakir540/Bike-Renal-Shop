import { Schema, model } from 'mongoose';
import { Product } from './product.interface';

// Define the Variant schema
const variantSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const inventorySchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

const ProductSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },

  price: { type: Number, required: true },

  category: { type: String, required: true },

  tags: { type: [String], default: [] },

  variants: {
    type: [variantSchema],
    default: [],
  },

  inventory: {
    type: inventorySchema,
    required: true,
  },
});

export const ProductModel = model<Product>('Product', ProductSchema);
