import mongoose, { Document, Schema } from "mongoose";
import { IToken, TokenType } from "../schemas/token.schema";

export interface ITokenDoc extends Omit<IToken, "userId">, Document {
  userId: mongoose.Types.ObjectId; // DB stores ObjectId, not string
}

const tokenSchema = new Schema<ITokenDoc>(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokenType: {
      type: String,
      enum: Object.values(TokenType), // uture-proof
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Token = mongoose.model<ITokenDoc>("Token", tokenSchema);
