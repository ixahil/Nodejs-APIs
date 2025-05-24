import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import AsyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

export const authenticate =
  (roles = ["USER"]) =>
  async (req, res, next) => {
    try {
      const token =
        req.cookies?.AccessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) throw new AppError(401, "unauthorized request, login first");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        res.clearCookie("AccessToken");
        throw new AppError(401, "unauthorized request, login first");
      }

      if (!roles.includes(user.role)) {
        res.clearCookie("AccessToken");
        throw new AppError(
          401,
          "unauthorized, you don't have permission to visit this route"
        );
      }

      req.user = user._doc;
      next();
    } catch (error) {
      res.clearCookie("AccessToken");
      throw new AppError(401, "unauthorized request, login first");
    }
  };
