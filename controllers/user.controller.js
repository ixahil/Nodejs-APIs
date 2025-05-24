import AsyncHandler from "../middleware/asyncHandler.js";
import AppResponse from "../utils/AppResponse.js";

export const getUser = AsyncHandler(async (req, res, next) => {
  // #swagger.tags = ['User']
  /*
  /* #swagger.responses[200] = {
            description: 'Get logged in User',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const { _id, password, ...user } = req.user;
  res.status(200).json(new AppResponse(200, user));
});
