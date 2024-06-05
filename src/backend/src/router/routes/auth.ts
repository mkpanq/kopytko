import { Hono } from "hono";

const AUTH_BASEPATH = "/auth";
export const authRouter = new Hono().basePath(AUTH_BASEPATH);

// Login -> Check if user exists and if credentials are OK, then create, encode and return JWT token
// Signup -> Check if user can be created and if credentials and data is OK, then create, encode and return JWT token
// Logout -> Destroy token

// authRouter.get("/me", (c) => {
//   return c.text("hello public");
// });
