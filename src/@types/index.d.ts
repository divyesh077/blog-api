import { IUserDoc } from "../models/user.model";
import { IUser } from "../schemas/user.schema";

declare global {
  namespace Express {
    export interface Request {
      user?: IUserDoc;
    }
  }
}
