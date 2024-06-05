import { z } from "zod";

const BACKEND_ENVS = z
  .object({
    SERVER_PORT: z.string().transform(Number),
  })
  .parse(process.env);

export default BACKEND_ENVS;
