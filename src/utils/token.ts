import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { IJwtPayload } from "../schemas/token.schema";
import { BadRequestError } from "./errors/BadRequestError";

/**
 * Sign a JWT token
 * @param payload - Data to sign (can be object, string, or Buffer)
 * @param secret - Secret key for signing
 * @param expiresIn - Expiration time (e.g., "1h", "7d")
 */
export const signToken = (
  payload: IJwtPayload,
  secret: Secret,
  expiresIn: SignOptions["expiresIn"]
): string => {
  const options: SignOptions = { expiresIn }; //Explicitly define options
  return jwt.sign(payload, secret, options);
};

/**
 * Verify a JWT token and return payload
 * @param token - JWT token string
 * @param secret - Secret key
 * @returns JwtPayload if valid
 */
export const verifyToken = (token: string, secret: Secret): IJwtPayload => {
  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === "string") {
      throw new BadRequestError("Invalid token payload type");
    }
    return decoded as IJwtPayload; // ✅ This is JwtPayload
  } catch (error) {
    throw error;
  }
};
