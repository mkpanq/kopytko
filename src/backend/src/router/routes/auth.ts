import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ZSignupUserSchemaFormValidation } from "../../../shared/schemas/user";
import { UserAlreadyExistsError } from "../../services/users/errors";
import { T_I_User, T_S_User } from "../../../db/schemas";
import { HTTPException } from "hono/http-exception";
import { saveUser } from "../../services/users/users.service";

// Signup -> Check if user can be created and if credentials and data is OK, then create, encode and return JWT token
// Login -> Check if user exists and if credentials are OK, then create, encode and return JWT token
// Logout -> Destroy token
// First - just verify and create user in database, without creating any JWT token session

export const authRouter = new Hono().post(
  "/signup",
  zValidator("json", ZSignupUserSchemaFormValidation),
  async (c) => {
    const signupData: T_I_User = c.req.valid("json");
    try {
      const newUser: T_S_User[] = await saveUser(signupData);
      return c.json(newUser);
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        throw new HTTPException(409, { message: err.message });
      }
    }
  }
);
