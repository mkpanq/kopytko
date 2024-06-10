import { sign, verify } from "hono/jwt";
import AUTH_ENVS from "../../../env/auth";
import { TSelectUser, TTokenPayload } from "../../../shared/schemas/user";
import { transformUserDataToTokenDataFormat } from "./utils";

const JWT_ALGORYTHM = "HS256";
const JWT_SECRET = AUTH_ENVS.AUTH_SECRET;

export async function generateJWTTokenForUser(
  data: TSelectUser
): Promise<string> {
  const tokenPayload: TTokenPayload = transformUserDataToTokenDataFormat(data);
  return sign(tokenPayload, JWT_SECRET, JWT_ALGORYTHM);
}

export async function verifyJWTToken(token: string) {
  return (await verify(token, JWT_SECRET)) as TTokenPayload;
}
