import dotenv from "dotenv";
import z from "zod";

dotenv.config();

enum NodeEnv {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test",
}

const envSchemaZ = z.object({
  NODE_ENV: z.enum(NodeEnv).default(NodeEnv.DEVELOPMENT),
  PORT: z.coerce.number().default(3000),
});

type IEnv = z.infer<typeof envSchemaZ>;

const createEnv = (): IEnv => {
  const result = envSchemaZ.safeParse(process.env);
  if (!result.success) {
    throw Error("Env not setup. Please set the all environment variables...");
  }
  return result.data;
};

export const env = createEnv();
