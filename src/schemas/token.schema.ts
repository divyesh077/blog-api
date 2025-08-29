import { JwtPayload } from "jsonwebtoken";
import { Schema } from "mongoose";
import z from "zod";
import { UserRole } from "./user.schema";

export enum TokenType {
  "REFRESH" = "refresh",
  "VERIFY_EMAIL" = "verify_email",
  "RESET_PASSWORD" = "reset_password",
}
export const TokenSchemaZ = z.object({
  token: z.string().nonempty(),
  userId: z.string().nonempty(),
  tokenType: z.enum(TokenType),
});

export type IToken = z.infer<typeof TokenSchemaZ>;
export interface IJwtPayload extends JwtPayload {
  userId: Schema.Types.ObjectId;
  role: UserRole;
}
