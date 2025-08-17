import z from "zod";

export enum UserRole {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin",
  USER = "user",
}
export const UserSchemaZ = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string().min(8),
  roles: z.enum(UserRole).default(UserRole.USER),
});

export type IUser = z.infer<typeof UserSchemaZ>;
