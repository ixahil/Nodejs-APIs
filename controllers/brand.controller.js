import AsyncHandler from "../middleware/asyncHandler.js";
import { Brand } from "../models/brand.model.js";
import AppResponse from "../utils/AppResponse.js";

export const createBrand = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['brand']

  /* #swagger.responses[200] = {
            description: 'Create brand Admin',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const { name, slug, image } = req.body;

  const brand = await Brand.create({ name, slug, image });
  res.status(201).json(new AppResponse(201, brand, "created successfully!"));
});

export const updateBrand = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['brand']

  /* #swagger.responses[200] = {
            description: 'Update brand Admin',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const { name, image } = req.body;

  const brand = await Brand.findOneAndUpdate(
    { slug: req.params.slug },
    { name, image }
  );
  res.status(201).json(new AppResponse(201, brand, "updated successfully!"));
});

export const getBrands = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['brand']

  /* #swagger.responses[200] = {
            description: 'get brands Admin',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const brands = await Brand.find();
  res.status(200).json(new AppResponse(200, brands));
});

export const getBrandBySlug = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['brand']

  /* #swagger.responses[200] = {
            description: 'get brand by Slug Admin',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const brand = await Brand.findOne({ slug: req.params.slug });
  res.status(200).json(new AppResponse(200, brand));
});

export const deleteBrandBySlug = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['brand']

  /* #swagger.responses[200] = {
            description: 'delete brand by Slug Admin',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const brand = await Brand.findOneAndDelete({ slug: req.params.slug });
  res.status(200).json(new AppResponse(200, brand, "deleted successfully!"));
});
