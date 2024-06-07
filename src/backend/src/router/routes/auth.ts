import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  ZLoginUserSchemaFormValidation,
  ZSignupUserSchemaFormValidation,
} from "../../../shared/schemas/user";
import {
  BadCredentials,
  LogoutError,
  UserAlreadyExistsError,
} from "../../services/users/errors";
import { TInsertUser } from "../../../shared/schemas/user";
import { HTTPException } from "hono/http-exception";
import { loginUser, signupUser } from "../../services/users/users.service";
import { setAuthCookie } from "../../services/jwt/cookie.service";
import { deleteCookie } from "hono/cookie";
import AUTH_ENVS from "../../../env/auth";

const authRouter = new Hono()
  .post(
    "/signup",
    zValidator("json", ZSignupUserSchemaFormValidation),
    async (c) => {
      const signupData: TInsertUser = c.req.valid("json");
      try {
        const authToken: string = await signupUser(signupData);
        setAuthCookie(c, authToken);
        return c.text("Signup successful");
      } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
          throw new HTTPException(409, { message: err.message });
        }
      }
    }
  )
  .post(
    "/login",
    zValidator("json", ZLoginUserSchemaFormValidation),
    async (c) => {
      const loginData = c.req.valid("json");
      try {
        const authToken: string = await loginUser(loginData);
        setAuthCookie(c, authToken);
        return c.text("Login successful");
      } catch (err) {
        if (err instanceof BadCredentials) {
          throw new HTTPException(401, { message: err.message });
        }
      }
    }
  )
  .delete("/logout", async (c) => {
    try {
      const deletedCookie = deleteCookie(c, AUTH_ENVS.AUTH_TOKEN_NAME);
      if (!deletedCookie) throw new LogoutError();
      return c.text("Logout successful");
    } catch (err) {
      if (err instanceof LogoutError) {
        throw new HTTPException(404, { message: err.message });
      }
    }
  });

export default authRouter;
