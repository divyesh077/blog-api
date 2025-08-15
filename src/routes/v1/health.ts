import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "✅ OK",
    message: "🚀 API is healthy and running smoothly!",
    uptime: process.uptime().toFixed(0) + " seconds",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

export default router;
