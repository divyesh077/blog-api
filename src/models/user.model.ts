import mongoose, { Model } from "mongoose";

import bcrypt from "bcryptjs";

import { IUser, UserRole } from "../schemas/user.schema";

export interface IUserDoc extends IUser, mongoose.Document {}
export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string): Promise<boolean>;
}
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
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this as IUserDoc;

  if (!user.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    next();
  } catch (error) {
    return next(error as Error);
  }
});

userSchema.statics.isEmailTaken = async function (email: string) {
  const user = await this.findOne({ email });
  return !!user;
};

export const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);
