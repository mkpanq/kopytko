import { Hono } from "hono";
import authRouter from "./routes/auth";
import issuesDataRouter from "./routes/issues";
import meRouter from "./routes/me";

export const rootRouter = new Hono()
  .route("/issues", issuesDataRouter)
  .route("/auth", authRouter)
  .route("/me", meRouter);
