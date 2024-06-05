import { Hono } from "hono";
import { jwt } from "hono/jwt";
import AUTH_ENVS from "../../../env/auth";

export const dashboardRouter = new Hono()
  .use(
    "/*",
    jwt({
      secret: AUTH_ENVS.AUTH_SECRET,
      cookie: "token",
    })
  )
  .get("/", (c) => {
    return c.text("This should be seen only for authenticated users !");
  });

export default dashboardRouter;
