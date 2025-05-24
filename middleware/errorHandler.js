import mongoose from "mongoose";
import { AppError } from "../utils/AppError.js";
import { configDotenv } from "dotenv";
configDotenv();

const ISDEV = process.env.NODE_ENV === "development";

export const ErrorHandler = (err, req, res, next) => {
  let error = err;

  // Duplicate key error (MongoDB)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(", ");
    const value = Object.values(err.keyValue).join(", ");
    const message = `${field}: ${value} already exists!`;
    error = new AppError(400, message, [], err.stack);
  }

  // validation Error [ValidationError]
  else if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);

    const message = `Validation failed: ${errors.join(", ")}`;

    error = new AppError(400, message, errors, err.stack);
  }

  // Generic Mongo error (not AppError)
  else if (err instanceof mongoose.mongo.MongoError) {
    error = new AppError(400, err.message, [], err.stack);
  }

  // Any non-AppError gets converted
  else if (!(err instanceof AppError)) {
    error = new AppError(
      500,
      err.message || "Something went wrong",
      [],
      err.stack
    );
  }
  console.log(err.name);

  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
    ...(ISDEV && { stack: error.stack }),
  };

  return res.status(error.statusCode).json(response);
};
