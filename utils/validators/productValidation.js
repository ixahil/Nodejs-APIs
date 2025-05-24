// utils/validators/productValidation.js
import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  sku: Joi.string().alphanum().min(3).max(30).required(),
  description: Joi.string().allow(""),
  //   collections: Joi.array().items(Joi.string().hex().length(24)), // assuming MongoDB ObjectId
  brand: Joi.string(),
  price: Joi.number().positive().required(),
  salePrice: Joi.number().positive().less(Joi.ref("price")).allow(null),
  stock: Joi.number().integer().min(0).default(0),
  isFeatured: Joi.boolean().default(false),
  isVisible: Joi.boolean().default(true),
  status: Joi.string().valid("ACTIVE", "DRAFT", "DELETED").default("ACTIVE"),
  handle: Joi.string().alphanum().min(3).max(50).required(),
});

export const validateProduct = (data) => {
  return productSchema.validate(data, { abortEarly: false });
};
