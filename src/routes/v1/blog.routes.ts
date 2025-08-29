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
import { BlogIdParamsSchema, BlogSchemaZ } from "../../schemas/blog.schema";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:blogId", validate({ params: BlogIdParamsSchema }), getBlogById);

router.post("/", validate({ body: BlogSchemaZ }), createBlog);

router.put(
  "/:blogId",
  validate({ params: BlogIdParamsSchema, body: BlogSchemaZ.partial() }),
  updateBlogById
);

router.delete(
  "/:blogId",
  validate({ params: BlogIdParamsSchema }),
  deleteBlogById
);
router.delete("/", deleteBlogs);

export default router;
