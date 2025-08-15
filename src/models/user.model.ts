import mongoose from "mongoose";
import { IUser, UserRole } from "../schemas/user.schema";

interface IUserDoc extends IUser, mongoose.Document {}

const userSchema = new mongoose.Schema<IUserDoc>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER],
      default: UserRole.USER,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
