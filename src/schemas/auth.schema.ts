import z from "zod";
import { UserSchemaZ } from "./user.schema";

export const RegisterSchemaZ = UserSchemaZ.pick({
  email: true,
  password: true,
});

export const LoginSchemaZ = RegisterSchemaZ;
