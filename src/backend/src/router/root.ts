import { Hono } from "hono";
import { issuesDataRouter } from "./routes/issues";

export const rootRouter = new Hono().route("/issues", issuesDataRouter);
