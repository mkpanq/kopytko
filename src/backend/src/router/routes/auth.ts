import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  ZLoginUserSchemaFormValidation,
  ZSignupUserSchemaFormValidation,
} from "../../../shared/schemas/user";
import {
  BadCredentials,
  UserAlreadyExistsError,
} from "../../services/users/errors";
import { TInsertUser, TSelectUser } from "../../../shared/schemas/user";
import { HTTPException } from "hono/http-exception";
import { authorizeUser, saveUser } from "../../services/users/users.service";

// Signup -> Check if user can be created and if credentials and data is OK, then create, encode and return JWT token
// Login -> Check if user exists and if credentials are OK, then create, encode and return JWT token
// Logout -> Destroy token
// First - just verify and create user in database, without creating any JWT token session

export const authRouter = new Hono()
  .post(
    "/signup",
    zValidator("json", ZSignupUserSchemaFormValidation),
    async (c) => {
      const signupData: TInsertUser = c.req.valid("json");
      try {
        const newUser: TSelectUser[] = await saveUser(signupData);
        return c.json(newUser);
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
        const user: TSelectUser = await authorizeUser(loginData);
        return c.json(user);
      } catch (err) {
        if (err instanceof BadCredentials) {
          throw new HTTPException(401, { message: err.message });
        }
      }
    }
  );
