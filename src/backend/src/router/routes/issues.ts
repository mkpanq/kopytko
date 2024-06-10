import { Hono } from "hono";
import { TTokenPayload } from "../../../shared/schemas/user";
import {
  getPublicAndUserIssues,
  getPublicIssues,
} from "../../services/issues/issues.service";
import { verifyJWTToken } from "../../services/jwt/jwt.service";
import { getAuthCookie } from "../../services/jwt/cookie.service";
import { CookieNotFound } from "../../services/jwt/errors";
import { JwtTokenInvalid } from "hono/utils/jwt/types";

export const issuesDataRouter = new Hono();

issuesDataRouter.get("/", async (c) => {
  try {
    const token = getAuthCookie(c);
    if (!!!token) throw new CookieNotFound();

    const data: TTokenPayload = await verifyJWTToken(token);
    if (!!!data) throw new JwtTokenInvalid(token);

    const userId = data.user.id;
    const issues = await getPublicAndUserIssues(userId);

    return c.json(issues);
  } catch (error) {
    if (error instanceof (CookieNotFound || JwtTokenInvalid)) {
      const publicIssues = await getPublicIssues();
      return c.json(publicIssues);
    }
  }
});

export default issuesDataRouter;
