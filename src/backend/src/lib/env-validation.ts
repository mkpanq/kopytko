import { z } from "zod";

const BACKEND_ENVS = z
  .object({
    SERVER_PORT: z.string().transform(Number),
    API_BASE_PATH: z.string(),
  })
  .parse(process.env);

export default BACKEND_ENVS;
