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
//update a single value
const updateProductIntoDB = async (productId: string, productData: Product) => {
  const result = await ProductModel.findByIdAndUpdate(productId, productData, {
    new: true,
  });
  return result;
};

//deleted value
const deleteProductIntoDB = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId);
  return result;
};
//Searce specific value
const searceProductIntoDB = async (searchTerm: string) => {
  // const searchTermReges = new RegExp(searchTerm, 'i');
  // console.log({ searchTermReges });

  // const result = await ProductModel.find({
  //   $or: [
  //     { name: searchTermReges },
  //     { description: searchTermReges },
  //     { category: searchTermReges },
  //     { tags: { $in: [searchTermReges] } },
  //   ],
  // });

  const result = await ProductModel.find({
    name: new RegExp(searchTerm as string, 'i'),
  });
  // const result = await ProductModel.find({ $text: { $search: searchTerm } });

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProducts,
  getSingleProduct,
  updateProductIntoDB,
  deleteProductIntoDB,
  searceProductIntoDB,
};
