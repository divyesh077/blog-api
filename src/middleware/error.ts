import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors/ApiError";
import { logger } from "../lib/logger";

export const errorConverter = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  logger.error(JSON.stringify(err));
  if (err instanceof ApiError) {
    return next(err);
  }
  let error;
  let statusCode = 500;
  let message = "Internal server error..";

  error = new ApiError({ statusCode, message });
  next(error);
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = (err as ApiError).statusCode || 500;
  const message = (err as ApiError).message || "Internal server error...";

  res.status(statusCode).json({
    sucess: false,
    message: message,
    errors: [err],
  });
};
