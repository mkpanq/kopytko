import { Hono } from "hono";
import { authRouter, issuesDataRouter } from "./routes";

export const rootRouter = new Hono()
  .route("/issues", issuesDataRouter)
  .route("/auth", authRouter);
