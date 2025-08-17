import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { NotFoundError } from "../utils/errors/NotFoundError";

export const NotFound = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const error = new NotFoundError();
    next(error);
  }
);
