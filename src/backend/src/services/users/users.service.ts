import {
  findUserByEmail,
  insertUsers,
} from "../../../db/repositories/user.repository";
import { T_I_User, T_S_User } from "../../../db/schemas";
import { UserAlreadyExistsError } from "./errors";
import { generateHash } from "./utils";

export async function saveUser(userData: T_I_User): Promise<T_S_User[]> {
  if (await _userExists(userData.email)) throw new UserAlreadyExistsError();

  const hashedPassword = await generateHash(userData.password);
  const hashedUserData = { ...userData, password: hashedPassword };

  return await insertUsers(hashedUserData);
}

async function _userExists(email: string): Promise<boolean> {
  const existingUser = await findUserByEmail(email);
  return Boolean(existingUser.length);
}
