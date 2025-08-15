import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./lib/logger";

const PORT = env.PORT || 3000;

app.listen(PORT, () =>
  logger.info(`Server is running on http://localhost:${PORT}`)
);
