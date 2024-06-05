import {
  findUserByEmail,
  insertUsers,
} from "../../../db/repositories/user.repository";
import {
  TInsertUser,
  TLoginUser,
  TSelectUser,
  TTokenUser,
} from "../../../shared/schemas/user";
import { generateJWTToken } from "../jwt/jwt.service";
import { BadCredentials, UserAlreadyExistsError } from "./errors";
import {
  generatePasswordHash,
  transformUserDataToTokenDataFormat,
  validatePasswordHash,
} from "./utils";

export async function saveUser(userData: TInsertUser): Promise<TSelectUser[]> {
  const user = await findUserByEmail(userData.email);
  if (user.length) throw new UserAlreadyExistsError();

  const hashedPassword = await generatePasswordHash(userData.password);
  const hashedUserData = { ...userData, password: hashedPassword };

  return await insertUsers(hashedUserData);
}

export async function authorizeUser(userData: TLoginUser): Promise<string> {
  const user = await findUserByEmail(userData.email);
  if (!user.length) throw new BadCredentials();

  const isPasswordCorrect = await validatePasswordHash(
    userData.password,
    user[0].password
  );
  if (!isPasswordCorrect) throw new BadCredentials();

  const tokenUserData = transformUserDataToTokenDataFormat(user[0]);
  const authToken = await generateJWTToken(tokenUserData);

  return authToken;
}
