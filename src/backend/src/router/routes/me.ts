import { Hono } from "hono";
import { jwt } from "hono/jwt";
import AUTH_ENVS from "../../../env/auth";
import { TTokenUser } from "../../../shared/schemas/user";

export const meRouter = new Hono()
  .use(
    "/*",
    jwt({
      secret: AUTH_ENVS.AUTH_SECRET,
      cookie: AUTH_ENVS.AUTH_TOKEN_NAME,
    })
  )
  .get("/", (c) => {
    const payload = c.get("jwtPayload");
    const meData: TTokenUser = {
      id: payload.id,
    };
    return c.json(meData);
  });

export default meRouter;
