import { Hono } from "hono";
import { publicDataRouter } from "./routes/public";
import { authDataRouter } from "./routes/auth";

export const rootRouter = new Hono()
  .route("/public", publicDataRouter)
  .route("/auth", authDataRouter);
