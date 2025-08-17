import { logger } from "../lib/logger";
import { User } from "../models/user.model";
import { IUser, UserRole } from "../schemas/user.schema";
import { NotFoundError } from "../utils/errors/NotFoundError";

const createUser = async (userDetails: IUser) => {
  try {
    const user = new User({
      username: userDetails.username,
      email: userDetails.email,
      password: userDetails.password,
      roles: userDetails.roles || UserRole.USER,
    });
    const createdUser = await user.save();
    return createdUser;
  } catch (error) {
    logger.error(
      `UserService :: createUser :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    logger.error(
      `UserService :: getUsers :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const getUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError(`user not found with email : ${userId}`);
    return user;
  } catch (error) {
    logger.error(
      `UserService :: getUserById :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) throw new NotFoundError(`user not found with email : ${email}`);
    return user;
  } catch (error) {
    logger.error(
      `UserService :: getUserByEmail :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const updateUserById = async (userId: string, userDetails: IUser) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userDetails, {
      new: true,
    });
    if (!updatedUser)
      throw new NotFoundError(`user not found with userId : ${userId}`);
    return updatedUser;
  } catch (error) {
    logger.error(
      `UserService :: updateUserById :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const deleteUserById = async (userId: string) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser)
      throw new NotFoundError(`user not found with userId : ${userId}`);
    return deletedUser;
  } catch (error) {
    logger.error(
      `UserService :: deleteUserById :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const deleteUsers = async () => {
  try {
    return await User.deleteMany();
  } catch (error) {
    logger.error(
      `UserService :: deleteUsers :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUserById,
  deleteUserById,
  deleteUsers,
};
