import { Hono } from "hono";

export const publicDataRouter = new Hono().get("/", (c) => {
  return c.text("hello public");
});
