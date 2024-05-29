import { z } from "zod";

// TODO: This file should be treated differently - this config is needed during startup
// Configuration for vite.config.ts during server start
const VITE_CONFIG_ENVS = z
  .object({
    SERVER_PORT: z.string().transform(Number),
    API_BASE_PATH: z.string(),
  })
  .parse(process.env);

export default VITE_CONFIG_ENVS;
