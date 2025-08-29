import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import userService from "../services/user.service";
import { IUser } from "../schemas/user.schema";

export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getUsers();
    res.status(200).json({
      status: "OK",
      success: true,
      data: users,
    });
  }
);

export const getUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    res.status(200).json({
      status: "OK",
      success: true,
      data: user,
    });
  }
);

export const getUserByEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    res.status(200).json({
      status: "OK",
      success: true,
      data: user,
    });
  }
);

export const updateUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const userDetails = req.body as IUser;
    const updatedUser = await userService.updateUserById(userId, userDetails);
    res.status(200).json({
      status: "OK",
      success: true,
      data: updatedUser,
    });
  }
);

export const deleteUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const deletedDocs = await userService.deleteUserById(userId);
    res.status(200).json({
      status: "OK",
      success: true,
      data: deletedDocs,
    });
  }
);

export const deleteUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedUsers = await userService.deleteUsers();
    res.status(200).json({
      status: "OK",
      success: true,
      data: deletedUsers,
    });
  }
);
