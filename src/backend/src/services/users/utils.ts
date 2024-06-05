import bcrypt from "bcrypt";
import BACKEND_ENVS from "../../../env/backend";

export async function generateHash(value: string): Promise<string> {
  return await bcrypt.hash(value, BACKEND_ENVS.HASH_SALT_ROUNDS);
}

export async function validateHash(
  value: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(value, hash);
}
