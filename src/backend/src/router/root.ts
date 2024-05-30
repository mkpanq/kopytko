import { Hono } from "hono";
import { publicDataRouter } from "./routes/public";

export const rootRouter = new Hono().route("/public", publicDataRouter);
