import { z } from "zod";

const AUTH_ENVS = z
  .object({
    HASH_SALT_ROUNDS: z.string().transform(Number),
    AUTH_SECRET: z.string(),
    AUTH_TOKEN_NAME: z.string(),
    AUTH_TOKEN_MAX_AGE: z.string().transform(Number),
  })
  .parse(process.env);

export default AUTH_ENVS;
