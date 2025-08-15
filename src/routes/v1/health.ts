import express, { Request, Response, NextFunction } from "express";
import { env } from "../../config/env";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "✅ OK",
    message: "🚀 API is healthy and running smoothly!",
    uptime: process.uptime().toFixed(0) + " seconds",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: env.NODE_ENV,
  });
});

export default router;
