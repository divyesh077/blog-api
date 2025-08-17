import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

/**
 * Sign a JWT token
 * @param payload - Data to sign (can be object, string, or Buffer)
 * @param secret - Secret key for signing
 * @param expiresIn - Expiration time (e.g., "1h", "7d")
 */
export const signToken = (
  payload: object | string | Buffer,
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
export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === "string") {
      throw new Error("Invalid token payload type");
    }
    return decoded; // ✅ This is JwtPayload
  } catch (error) {
    throw new Error("Token verification failed");
  }
};
