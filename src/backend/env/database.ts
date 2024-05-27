import { z } from "zod";

const DATABASE_ENVS = z
  .object({
    DATABASE_DRIVER: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.string().transform(Number),
    DATABASE_NAME: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
  })
  .parse(process.env);

export default DATABASE_ENVS;
