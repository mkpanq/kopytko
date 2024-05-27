import { z } from "zod";

export const FRONTEND_ENVS = z
  .object({
    VITE_APPLICATION_NAME: z.string().min(1),
  })
  .parse(import.meta.env);
