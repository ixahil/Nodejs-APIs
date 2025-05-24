import AsyncHandler from "../middleware/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";
import AppResponse from "../utils/AppResponse.js";
import { validateProduct } from "../utils/validators/productValidation.js";

export const getProducts = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['Product']

  /* #swagger.responses[200] = {
            description: 'Get Products',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */
  const products = await Product.find();

  res.status(200).json(new AppResponse(200, products));
});

export const getProductBySku = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['Product']

  /* #swagger.responses[200] = {
            description: 'Get Product by SKU',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */
  const products = await Product.find({ sku: req.params.sku });

  res.status(200).json(new AppResponse(200, products));
});

// Protected Routes

export const createProduct = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['Product']

  /* #swagger.responses[200] = {
            description: 'Create Product Admin',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const { error, value } = validateProduct(req.body);
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    throw new AppError(400, "Validation Error", errorMessages);
  }

  const existing = await Product.findOne({ sku: value.sku });

  if (existing) {
    throw new AppError(400, "Product with this SKU already exists");
  }

  const product = await Product.create(value);

  return res
    .status(201)
    .json(new AppResponse(201, product, "Product created successfully"));
});

export const updateProduct = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['Product']

  /* #swagger.responses[200] = {
            description: 'Update Product Admin',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const { error, value } = validateProduct(req.body);
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    throw new AppError(400, "Validation Error", errorMessages);
  }

  const existing = await Product.findOne({ sku: req.params.sku });

  if (!existing) {
    throw new AppError(400, "Product with this SKU not exists");
  }

  const product = await Product.findOneAndUpdate(
    { sku: req.params.sku },
    { ...value }
  );

  return res
    .status(200)
    .json(new AppResponse(200, product, "Product updated successfully"));
});

export const deleteProduct = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['Product']

  /* #swagger.responses[200] = {
            description: 'Delete Product Admin',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const { error, value } = validateProduct(req.body);
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    throw new AppError(400, "Validation Error", errorMessages);
  }

  const existing = await Product.findOneAndDelete({ sku: req.params.sku });

  return res
    .status(200)
    .json(new AppResponse(200, existing, "Product deleted successfully"));
});

export const getProductsByUser = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['Product']

  /* #swagger.responses[200] = {
            description: 'Get Products Admin - By User',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */
  const products = await Product.find({ owner: req.user.id });

  res.status(200).json(new AppResponse(200, products));
});
