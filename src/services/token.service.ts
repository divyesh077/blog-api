import { Schema } from "mongoose";
import { logger } from "../lib/logger";
import { Token } from "../models/token.model";
import { TokenType } from "../schemas/token.schema";

const saveToken = async (
  token: string,
  userId: Schema.Types.ObjectId,
  tokenType: TokenType
) => {
  try {
    const tokenDetails = new Token({
      token,
      userId,
      tokenType,
    });
    const tokenDoc = await tokenDetails.save();
    return tokenDoc;
  } catch (error) {
    logger.error(
      `TokenService :: saveToken :: error :: ${JSON.stringify(error)}`
    );
  }
};

const deleteToken = (token: string, tokenType: TokenType, userId: string) => {
  try {
  } catch (error) {
    logger.error(
      `TokenService :: deleteToken :: error :: ${JSON.stringify(error)}`
    );
  }
};

export default {
  saveToken,
  deleteToken,
};
