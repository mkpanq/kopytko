import { Hono } from "hono";
import { issuesDataRouter } from "./routes/issues";
import { authRouter } from "./routes/auth";

export const rootRouter = new Hono()
  .route("/issues", issuesDataRouter)
  .route("/", authRouter);
