import { Hono } from "hono";
import { rootRouter } from "./routes/_router";

const app = new Hono();

export const router = app.basePath("/api").route("/", rootRouter);
export default app;

export type ApiClientType = typeof router;
