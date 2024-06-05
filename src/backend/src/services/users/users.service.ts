import {
  findUserByEmail,
  insertUsers,
} from "../../../db/repositories/user.repository";
import {
  TInsertUser,
  TLoginUser,
  TSelectUser,
} from "../../../shared/schemas/user";
import { BadCredentials, UserAlreadyExistsError } from "./errors";
import { generateHash, validateHash } from "./utils";

export async function saveUser(userData: TInsertUser): Promise<TSelectUser[]> {
  const user = await findUserByEmail(userData.email);
  if (user.length) throw new UserAlreadyExistsError();

  const hashedPassword = await generateHash(userData.password);
  const hashedUserData = { ...userData, password: hashedPassword };

  return await insertUsers(hashedUserData);
}

export async function authorizeUser(
  userData: TLoginUser
): Promise<TSelectUser> {
  const user = await findUserByEmail(userData.email);
  if (!user.length) throw new BadCredentials();

  const isPasswordCorrect = await validateHash(
    userData.password,
    user[0].password
  );
  if (!isPasswordCorrect) throw new BadCredentials();

  return user[0];
}
