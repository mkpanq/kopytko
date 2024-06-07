import { Hono } from "hono";

export const issuesDataRouter = new Hono().get("/public", (c) => {
  return c.text("Public Issues");
});

export default issuesDataRouter;
