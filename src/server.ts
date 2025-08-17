import http from "http";

import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./lib/logger";
import { connectToDatabase } from "./lib/db";

const PORT = env.PORT || 3000;

let server;

const startServer = async () => {
  try {
    await connectToDatabase();
    server = http.createServer(app);
    server.listen(PORT, () =>
      logger.info(`Server is running on http://localhost:${PORT}`)
    );
  } catch (error: unknown) {
    logger.error(JSON.stringify(error));
    process.exit(0);
  }
};

startServer();
