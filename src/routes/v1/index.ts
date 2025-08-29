import express from "express";
import healthRouter from "./health";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";

const router = express.Router();

router.use("/health", healthRouter);

router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
