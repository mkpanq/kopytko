import { z } from "zod";

// Configuration for vite.config.ts
const VITE_CONFIG_ENVS = z
  .object({
    SERVER_PORT: z.string().transform(Number),
    API_BASE_PATH: z.string(),
  })
  .parse(process.env);

export default VITE_CONFIG_ENVS;
