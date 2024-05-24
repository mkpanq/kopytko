import { Hono } from "hono";

export const rootRouter = new Hono().get("/", (c) => {
  return c.text("Hello Hono!");
});
