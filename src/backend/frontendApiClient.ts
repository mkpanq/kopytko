import { hc } from "hono/client";
import { router } from "./src/app";

export const frontendApiClient = hc<typeof router>("/");
