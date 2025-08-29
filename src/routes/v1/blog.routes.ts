import express from "express";
import {
  createBlog,
  deleteBlogById,
  deleteBlogs,
  getBlogById,
  getBlogs,
  updateBlogById,
} from "../../controllers/blog.controller";
import { validate } from "../../middleware/validate";
import { BlogSchemaZ } from "../../schemas/blog.schema";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:blogId", getBlogById);

router.post("/", validate({ body: BlogSchemaZ }), createBlog);

router.put("/:blogId", updateBlogById);

router.delete("/:blogId", deleteBlogById);
router.delete("/", deleteBlogs);

export default router;
