import bcrypt from "bcrypt";
import AUTH_ENVS from "../../../env/auth";
import { user } from "../../../db/schemas";
import { TSelectUser, TTokenUser } from "../../../shared/schemas/user";

export async function generatePasswordHash(value: string): Promise<string> {
  return await bcrypt.hash(value, AUTH_ENVS.HASH_SALT_ROUNDS);
}

export async function validatePasswordHash(
  value: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(value, hash);
}

export function transformUserDataToTokenDataFormat(
  user: TSelectUser
): TTokenUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
  };
}
