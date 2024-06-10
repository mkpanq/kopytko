import { Hono } from "hono";
import { jwt } from "hono/jwt";
import AUTH_ENVS from "../../../env/auth";
import { TTokenPayload, TTokenUser } from "../../../shared/schemas/user";

export const meRouter = new Hono()
  .use(
    "/*",
    jwt({
      secret: AUTH_ENVS.AUTH_SECRET,
      cookie: AUTH_ENVS.AUTH_TOKEN_NAME,
    })
  )
  .get("/", (c) => {
    const payload: TTokenPayload = c.get("jwtPayload");
    const userData: TTokenUser = payload.user;
    return c.json(userData);
  });

export default meRouter;
