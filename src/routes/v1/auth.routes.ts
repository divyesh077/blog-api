import express from "express";
import { signin, signout, signup } from "../../controllers/auth.controller";
import { validate } from "../../middleware/validate";
import {
  LoginSchemaZ,
  LogoutSchemaZ,
  RegisterSchemaZ,
} from "../../schemas/auth.schema";
import { authorization } from "../../middleware/authorization";
const router = express.Router();

router.post("/signup", validate({ body: RegisterSchemaZ }), signup);
router.post("/signin", validate({ body: LoginSchemaZ }), signin);
router.post(
  "/signout",
  authorization,
  validate({ body: LogoutSchemaZ }),
  signout
);

export default router;
