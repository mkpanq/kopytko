import { Hono } from "hono";
import { rootRouter } from "./router/root";

export const API_BASE_PATH = "/api";
const app = new Hono();
export const router = app.basePath(API_BASE_PATH).route("/", rootRouter);

export default app;
export type ApiClientType = typeof router;
