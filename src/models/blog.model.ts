import mongoose, { Document } from "mongoose";
import { IBlog } from "../schemas/blog.schema";

export interface IBlogDoc extends IBlog, Document {}

const blogSchema = new mongoose.Schema<IBlogDoc>(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 30,
    },
    body: {
      type: String,
      required: true,
      min: 5,
    },
    uri: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model<IBlogDoc>("Blog", blogSchema);
