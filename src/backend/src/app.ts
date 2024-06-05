import { Hono } from "hono";
import { rootRouter } from "./router/root";
import { logger } from "hono/logger";

export const API_BASE_PATH = "/api";

const app = new Hono().use(logger());
export const router = app.basePath(API_BASE_PATH).route("/", rootRouter);

export default app;
export type ApiClientType = typeof router;
