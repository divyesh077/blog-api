import z from "zod";

export const BlogSchemaZ = z.object({
  title: z.string().nonempty().min(2).max(30),
  body: z.string().nonempty().min(5),
  uri: z.string().nonempty(),
});

export const BlogIdParamsSchema = z.object({
  blogId: z.string().min(16),
});

export type IBlog = z.infer<typeof BlogSchemaZ>;
