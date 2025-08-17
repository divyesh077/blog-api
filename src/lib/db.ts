import mongoose, { ConnectOptions } from "mongoose";
import { env } from "../config/env";
import { logger } from "./logger";

export const connectToDatabase = async () => {
  try {
    const options: ConnectOptions = {};
    await mongoose.connect(env.MONGO_URI, options);
    logger.info("Database connect succuessfully...");
  } catch (error) {
    throw error;
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
    logger.info("Database disconnect succuessfully... ");
  } catch (error) {
    throw error;
  }
};
