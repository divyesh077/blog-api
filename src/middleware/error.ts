import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors/ApiError";
import { logger } from "../lib/logger";

export const errorConverter = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: Error = err as Error;
  logger.error(JSON.stringify(err));

  if (err instanceof ApiError) {
    return next(err);
  }

  let statusCode = 500;
  let message = "Internal server error...";

  const errorName = error.name;

  switch (errorName) {
    case "ValidationError":
      statusCode = 403;
      message = error.message || "ValidationError";
      break;
    case "CastError":
      statusCode = 403;
      message = error.message || "CastError";
      break;
    case "ZodError":
      statusCode = 403;
      message = error.message || "ZodError";
      break;
    default:
      statusCode = 500;
      message = "Internal server error...";
      break;
  }

  error = new ApiError({ statusCode, message });
  next(error);
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = err as ApiError;
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error...";

  res.status(statusCode).json({
    success: false,
    message: message,
    errors: {
      statusCode,
      message,
    },
  });
};
