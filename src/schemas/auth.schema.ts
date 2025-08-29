import { TokenSchemaZ } from "./token.schema";
import { UserSchemaZ } from "./user.schema";

export const RegisterSchemaZ = UserSchemaZ.pick({
  email: true,
  password: true,
});

export const LoginSchemaZ = RegisterSchemaZ;

export const LogoutSchemaZ = TokenSchemaZ.pick({ token: true });
