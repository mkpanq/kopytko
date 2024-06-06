import { Hono } from "hono";
import { rootRouter } from "./router/root";
import { logger } from "hono/logger";

export const API_BASE_PATH = "/api";

// Check if needed !
// TODO: CORS settings !
// TODO: XSRF settins !
const app = new Hono().use(logger());
const router = app.basePath(API_BASE_PATH).route("/", rootRouter);

export default app;
export type ApiClientType = typeof router;
