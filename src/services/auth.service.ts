import mongoose, { Schema } from "mongoose";
import { logger } from "../lib/logger";
import { User } from "../models/user.model";
import { IUser, UserRole } from "../schemas/user.schema";
import { ConflictError } from "../utils/errors/ConflictError";
import userService from "./user.service";
import { signToken } from "../utils/token";
import { env } from "../config/env";
import tokenService from "./token.service";
import { TokenType } from "../schemas/token.schema";
import { SignOptions } from "jsonwebtoken";
import { BadRequestError } from "../utils/errors/BadRequestError";
import bcrypt from "bcryptjs";
import { Token } from "../models/token.model";

const signup = async (
  username: string,
  email: string,
  password: string,
  roles: UserRole = UserRole.USER
) => {
  try {
    const isEmailExist = await User.isEmailTaken(email);
    if (isEmailExist) {
      throw new ConflictError(
        `${email} is already taken.please use different email.`
      );
    }
    const userDetails: IUser = {
      username,
      email,
      password,
      roles: roles || UserRole.USER,
    };
    const createdUser = await userService.createUser(userDetails);
    if (!createdUser) throw new BadRequestError();
    const tokens = await generateAuthTokens(
      createdUser._id as Schema.Types.ObjectId,
      createdUser.roles
    );
    return {
      user: createdUser,
      tokens: tokens,
    };
  } catch (error) {
    logger.error(`AuthService :: signup :: error :: ${JSON.stringify(error)}`);
    throw error;
  }
};

const signin = async (email: string, password: string) => {
  try {
    const user = await userService.getUserByEmail(email);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new BadRequestError("Email or password is invalid!!!");
    const tokens = await generateAuthTokens(
      user._id as Schema.Types.ObjectId,
      user.roles
    );
    return {
      user: user,
      tokens: tokens,
    };
  } catch (error) {
    logger.error(`AuthService :: signin :: error :: ${JSON.stringify(error)}`);
    throw error;
  }
};

const signout = async (userId: string, token: string) => {
  try {
    const deletedTokenDoc = await Token.deleteOne({
      token,
      tokenType: TokenType.REFRESH,
      userId: userId,
    });
    return deletedTokenDoc;
  } catch (error) {
    logger.error(`AuthService :: signout :: error :: ${JSON.stringify(error)}`);
    throw error;
  }
};

const refreshAuthTokens = async () => {
  try {
  } catch (error) {
    logger.error(`AuthService :: login :: error :: ${JSON.stringify(error)}`);
    throw error;
  }
};

const verifyEmail = async () => {
  try {
  } catch (error) {
    logger.error(
      `AuthService :: verifyEmail :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const forgotPassword = async () => {
  try {
  } catch (error) {
    logger.error(
      `AuthService :: forgotPassword :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const resetPassword = async () => {
  try {
  } catch (error) {
    logger.error(
      `AuthService :: resetPassword :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const generateAuthTokens = async (
  userId: mongoose.Schema.Types.ObjectId,
  role: UserRole
) => {
  try {
    const payload = {
      userId: userId,
      role: role,
    };
    const accessToken = signToken(
      payload,
      env.ACCESS_TOKEN_SECRET,
      env.ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"]
    );
    const refreshToken = signToken(
      payload,
      env.REFRESH_TOKEN_SECRET,
      env.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"]
    );
    const tokenDoc = await tokenService.saveToken(
      refreshToken,
      userId,
      TokenType.REFRESH
    );
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    logger.error(`AuthService :: login :: error :: ${JSON.stringify(error)}`);
    throw error;
  }
};
export default {
  signup,
  signin,
  signout,
  refreshAuthTokens,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
