import { z } from "zod";

// BACKEND ENVS
const ZBACKEND_ENVS = z.object({
  SERVER_PORT: z.number().default(3000),
  API_BASE_PATH: z.string().default("/api"),
});
export const BACKEND_ENVS = ZBACKEND_ENVS.parse(process.env);
