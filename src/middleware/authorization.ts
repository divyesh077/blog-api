import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/errors/UnauthorizedError";
import { verifyToken } from "../utils/token";
import { env } from "../config/env";
import userService from "../services/user.service";
import { IJwtPayload } from "../schemas/token.schema";
import { logger } from "../lib/logger";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authorization header missing or invalid");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedError("Token missing");
    }

    const payload: IJwtPayload = verifyToken(token, env.ACCESS_TOKEN_SECRET);
    const { userId } = payload;

    const user = await userService.getUserById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error(
      `AuthorizationMiddleware :: error :: ${JSON.stringify(error)}`
    );
    next(error); // Pass to global error handler instead of throw
  }
};
