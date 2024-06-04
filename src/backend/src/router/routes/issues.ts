import { Hono } from "hono";

export const issuesDataRouter = new Hono().get("/", (c) => {
  return c.text("hello public");
});
