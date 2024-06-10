import { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import AUTH_ENVS from "../../../env/auth";

const DEFAULT_COOKIE_MAX_AGE = 1000;

export function setAuthCookie(context: Context, token: string) {
  setCookie(context, AUTH_ENVS.AUTH_TOKEN_NAME, token, {
    httpOnly: true,
    maxAge: AUTH_ENVS.AUTH_TOKEN_MAX_AGE || DEFAULT_COOKIE_MAX_AGE,
  });
}

export function getAuthCookie(context: Context) {
  return getCookie(context, AUTH_ENVS.AUTH_TOKEN_NAME);
}
