import { Hono } from "hono";
import { jwt } from "hono/jwt";
import AUTH_ENVS from "../../../env/auth";
import { TTokenUser } from "../../../shared/schemas/user";
import {
  getPublicIssues,
  getUserIssues,
} from "../../services/issues/issues.service";

export const issuesDataRouter = new Hono();

// What about one endpoint but return depends on JWT ?
issuesDataRouter.get("/", async (c) => {
  const issues = await getPublicIssues();
  return c.json(issues);
});

issuesDataRouter
  .use(
    "/user",
    jwt({
      secret: AUTH_ENVS.AUTH_SECRET,
      cookie: AUTH_ENVS.AUTH_TOKEN_NAME,
    })
  )
  .get("/user", async (c) => {
    const payload: TTokenUser = c.get("jwtPayload");
    const issues = await getUserIssues(payload.id);
    return c.json(issues);
  });

export default issuesDataRouter;
