import z from "zod";

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
