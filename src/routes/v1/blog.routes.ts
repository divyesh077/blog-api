import express from "express";
import {
  createBlog,
  deleteBlogById,
  deleteBlogs,
  getBlogById,
  getBlogs,
  updateBlogById,
} from "../../controllers/blog.controller";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:blogId", getBlogById);

router.post("/", createBlog);

router.put("/:blogId", updateBlogById);

router.delete("/:blogId", deleteBlogById);
router.delete("/", deleteBlogs);

export default router;
