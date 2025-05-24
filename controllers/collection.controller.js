import AsyncHandler from "../middleware/asyncHandler.js";
import { Collection } from "../models/collection.model.js";
import AppResponse from "../utils/AppResponse.js";

export const createCollection = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['collection']

  /* #swagger.responses[200] = {
            description: 'Create collection Admin',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const { name, slug, image } = req.body;

  const collection = await Collection.create({
    name,
    slug,
    image,
    user: req.user._id,
  });
  res
    .status(201)
    .json(new AppResponse(201, collection, "created successfully!"));
});

export const updateCollection = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['collection']

  /* #swagger.responses[200] = {
            description: 'Update collection Admin',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const { name, image } = req.body;

  const collection = await Collection.findOneAndUpdate(
    { slug: req.params.slug, user: req.user._id },
    { name, image }
  );
  res
    .status(201)
    .json(new AppResponse(201, collection, "updated successfully!"));
});

export const getCollections = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['collection']

  /* #swagger.responses[200] = {
            description: 'get collections Admin',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const collections = await Collection.find();
  res.status(200).json(new AppResponse(200, collections));
});

export const getCollectionBySlug = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['collection']

  /* #swagger.responses[200] = {
            description: 'get collection by Slug Admin',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const collection = await Collection.findOne({ slug: req.params.slug });
  res.status(200).json(new AppResponse(200, collection));
});

export const deleteCollectionBySlug = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['collection']

  /* #swagger.responses[200] = {
            description: 'delete collection by Slug Admin',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const collection = await Collection.findOneAndDelete({
    slug: req.params.slug,
    user: req.user._id,
  });
  res
    .status(200)
    .json(new AppResponse(200, collection, "deleted successfully!"));
});
