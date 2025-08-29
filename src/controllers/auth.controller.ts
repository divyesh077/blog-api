import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import authService from "../services/auth.service";
import { env, NodeEnv } from "../config/env";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { IUserDoc } from "../models/user.model";
import { Schema } from "mongoose";

export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, role } = req.body;
    const data = await authService.signup(username, email, password, role);

    res.cookie("accessToken", data.tokens.accessToken, {
      httpOnly: true, // prevent JavaScript access
      secure: env.NODE_ENV === NodeEnv.PRODUCTION, // HTTPS only in prod
      sameSite: "strict", // CSRF protection
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.cookie("refreshToken", data.tokens.refreshToken, {
      httpOnly: true, // prevent JavaScript access
      secure: env.NODE_ENV === NodeEnv.PRODUCTION, // HTTPS only in prod
      sameSite: "strict", // CSRF protection
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.status(201).json({
      success: true,
      message: "user create successfully....",
      data,
    });
  }
);

export const signin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const data = await authService.signin(email, password);

    res.cookie("accessToken", data.tokens.accessToken, {
      httpOnly: true, // prevent JavaScript access
      secure: env.NODE_ENV === NodeEnv.PRODUCTION, // HTTPS only in prod
      sameSite: "strict", // CSRF protection
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.cookie("refreshToken", data.tokens.refreshToken, {
      httpOnly: true, // prevent JavaScript access
      secure: env.NODE_ENV === NodeEnv.PRODUCTION, // HTTPS only in prod
      sameSite: "strict", // CSRF protection
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "user login successfully....",
      data,
    });
  }
);

export const signout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUserDoc;
    const { token } = req.body;
    const userId = user._id as string;
    const data = await authService.signout(userId, token);
    res.status(200).json({
      success: true,
      message: "user signout successfully....",
      data,
    });
  }
);
