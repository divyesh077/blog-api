import express from "express";
import healthRouter from "./health";
import userRouter from "./user.routes";

const router = express.Router();

router.use("/health", healthRouter);

router.use("/users", userRouter);

export default router;
