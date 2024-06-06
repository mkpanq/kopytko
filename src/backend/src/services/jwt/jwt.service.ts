import { sign } from "hono/jwt";
import AUTH_ENVS from "../../../env/auth";
import { TTokenUser } from "../../../shared/schemas/user";

const JWT_ALGORYTHM = "HS256";
const secret = AUTH_ENVS.AUTH_SECRET;

export async function generateJWTToken(data: TTokenUser): Promise<string> {
  return sign(data, secret, JWT_ALGORYTHM);
}
