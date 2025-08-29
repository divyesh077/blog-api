import express from "express";
import v1Router from "./routes/v1";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { limiter } from "./middleware/rateLimit";
import { errorConverter, errorHandler } from "./middleware/error";
import { NotFound } from "./middleware/not-found";

// Init the application.
const app = express();

// Security
app.use(helmet());
app.use(cors());

// Apply the rate limiting middleware to all requests.
app.use(limiter);

// Logger
app.use(morgan("dev"));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routing for v1
app.use("/api/v1", v1Router);

// No route found
app.use(NotFound);

// Global Error Handler
app.use(errorConverter);
app.use(errorHandler);

export { app };
