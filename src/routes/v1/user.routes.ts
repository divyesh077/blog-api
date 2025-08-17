import express from "express";
import {
  deleteUserById,
  deleteUsers,
  getUserById,
  getUsers,
  updateUserById,
} from "../../controllers/user.controller";

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.put("/:userId", updateUserById);
router.delete("/:userId", deleteUserById);
router.delete("/", deleteUsers);
export default router;
