import { z } from "zod";

const AUTH_ENVS = z
  .object({
    HASH_SALT_ROUNDS: z.string().transform(Number),
    AUTH_SECRET: z.string(),
  })
  .parse(process.env);

export default AUTH_ENVS;
