import { logger } from "../lib/logger";
import { Blog } from "../models/blog.model";
import { IBlog } from "../schemas/blog.schema";
import { NotFoundError } from "../utils/errors/NotFoundError";

const getBlogs = async () => {
  try {
    const blogs = await Blog.find();
    return blogs;
  } catch (error) {
    logger.error(
      `BlogService :: getBlogs :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const getBlogById = async (blogId: string) => {
  try {
    const blog = await Blog.findById(blogId);
    if (!blog)
      throw new NotFoundError(`Blog not found with blogId : ${blogId}`);
    return blog;
  } catch (error) {
    logger.error(
      `BlogService :: getBlogById :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const createBlog = async (blogDetails: IBlog) => {
  try {
    const blog = new Blog({
      title: blogDetails.title,
      body: blogDetails.body,
      uri: blogDetails.uri,
    });
    const createdBlog = await blog.save();
    return createdBlog;
  } catch (error) {
    logger.error(
      `BlogService :: createBlog :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const updateBlogById = async (blogId: string, blogDetails: IBlog) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogDetails, {
      new: true,
    });
    if (!updatedBlog)
      throw new NotFoundError(`Blog not found with blogId ; ${blogId}`);
    return updatedBlog;
  } catch (error) {
    logger.error(
      `BlogService :: updateBlogById :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const deleteBlogById = async (blogId: string) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog)
      throw new NotFoundError(`Blog not found with blogId ; ${blogId}`);
    return deletedBlog;
  } catch (error) {
    logger.error(
      `BlogService :: deleteBlogById :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

const deleteBlogs = async () => {
  try {
    const deletedBlogs = await Blog.deleteMany();
    return deletedBlogs;
  } catch (error) {
    logger.error(
      `BlogService :: deleteBlogs :: error :: ${JSON.stringify(error)}`
    );
    throw error;
  }
};

export default {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
  deleteBlogs,
};
