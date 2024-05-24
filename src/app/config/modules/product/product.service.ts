import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProducts = async () => {
  const allProduct = await ProductModel.find();
  return allProduct;
};

const getSingleProduct = async (_id: string) => {
  const Product = await ProductModel.findOne({ _id });
  console.log({ Product });
  return Product;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProducts,
  getSingleProduct,
};
