import { sign } from "hono/jwt";
import AUTH_ENVS from "../../../env/auth";
import { TSelectUser, TTokenUser } from "../../../shared/schemas/user";
import { transformUserDataToTokenDataFormat } from "./utils";

const JWT_ALGORYTHM = "HS256";
const secret = AUTH_ENVS.AUTH_SECRET;

export async function generateJWTTokenForUser(
  data: TSelectUser
): Promise<string> {
  const tokenUser: TTokenUser = transformUserDataToTokenDataFormat(data);
  return sign(tokenUser, secret, JWT_ALGORYTHM);
}
