import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import blogService from "../services/blog.service";
import { IBlog } from "../schemas/blog.schema";

export const getBlogs = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogs = await blogService.getBlogs();
    res.status(200).json({
      success: true,
      message: "Get All Blogs",
      data: blogs,
    });
  }
);

export const getBlogById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params;
    const blogs = await blogService.getBlogById(blogId);
    res.status(200).json({
      success: true,
      message: "Get Blog By Id",
      data: blogs,
    });
  }
);

export const createBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const blog = req.body as IBlog;
    const createdBlog = await blogService.createBlog(blog);
    res.status(201).json({
      success: true,
      message: "Created New Blog",
      data: createdBlog,
    });
  }
);

export const updateBlogById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params;
    const blog = req.body as IBlog;
    const updatedBlog = await blogService.updateBlogById(blogId, blog);
    res.status(200).json({
      success: true,
      message: "Blog update successgully... ",
      data: updatedBlog,
    });
  }
);

export const deleteBlogById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params;
    await blogService.deleteBlogById(blogId);
    res.status(200).json({
      success: true,
      message: "Blog deleted successgully... ",
      data: {},
    });
  }
);

export const deleteBlogs = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { blogId } = req.params;
    const blog = req.body as IBlog;
    const deletedBlogDetails = await blogService.deleteBlogs();
    res.status(200).json({
      success: true,
      message: "Blogs deleted successgully... ",
      data: deletedBlogDetails,
    });
  }
);
