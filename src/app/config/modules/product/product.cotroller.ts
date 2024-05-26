import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import Joi from 'joi';
const variantValidationSchema = Joi.object({
  type: Joi.string().required(),
  value: Joi.string().required(),
});

const inventoryValidationSchema = Joi.object({
  quantity: Joi.number().required(),
  inStock: Joi.boolean().required(),
});

const productValidatonSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).default([]),
  variants: Joi.array().items(variantValidationSchema).default([]),
  inventory: inventoryValidationSchema.required(),
});

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body.product;

    const { error } = productValidatonSchema.validate(product);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Somethink went wrong',
        error,
      });
    }

    const result = await ProductServices.createProductIntoDB(product);

    res.status(200).json({
      success: true,
      message: 'Product created Successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
// get all products and with search query
const getAllProductsController = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;

  // const searchTerm: string = req.query.searchTerm as string;

  try {
    let result;

    if (searchTerm) {
      result = await ProductServices.searceProductIntoDB(searchTerm as string);

      if (result && result.length > 0) {
        res.status(200).json({
          success: true,
          message: 'Products matching search term fetched successfully',
          data: result,
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'No products matching search term found',
        });
      }
    } else {
      result = await ProductServices.getAllProducts();
      res.status(200).json({
        success: true,
        message: 'Products fetch successfully',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occured while fetching products',
      error,
    });
  }
};

const getSingleProductController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getSingleProduct(productId);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Somethink went wrong',
      error: error,
    });
  }
};

// update section
const updateProduct = async (req: Request, res: Response) => {
  const product = req.body;
  const { error } = productValidatonSchema.validate(product);

  if (error) {
    res.status(500).json({
      success: false,
      message: 'Somethink went wrong',
      error,
    });
  }

  try {
    const { productId } = req.params;
    const productData = req.body;

    const result = await ProductServices.updateProductIntoDB(
      productId,
      productData,
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Product update failed',
      error: error,
    });
  }
};

//for delete functionality

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductIntoDB(productId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product Deleted successfully',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Product delete failed',
      error: error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProductsController,
  getSingleProductController,
  updateProduct,
  deleteProduct,
};
