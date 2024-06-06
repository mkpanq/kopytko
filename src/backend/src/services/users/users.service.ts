import {
  findUserByEmail,
  insertUsers,
} from "../../../db/repositories/user.repository";
import {
  TInsertUser,
  TLoginUser,
  TSelectUser,
} from "../../../shared/schemas/user";
import { generateJWTTokenForUser } from "../jwt/jwt.service";
import { BadCredentials, UserAlreadyExistsError } from "./errors";
import { generatePasswordHash, validatePasswordHash } from "./utils";

export async function loginUser(userData: TLoginUser): Promise<string> {
  const loggedUser = await _getUserFromDatabase(userData);
  const authToken = await generateJWTTokenForUser(loggedUser);

  return authToken;
}

export async function signupUser(userData: TInsertUser): Promise<string> {
  const newUser = await _saveUserToDatabase(userData);
  const authToken = await generateJWTTokenForUser(newUser);

  return authToken;
}

async function _saveUserToDatabase(
  userData: TInsertUser
): Promise<TSelectUser> {
  const user = await findUserByEmail(userData.email);
  if (user.length) throw new UserAlreadyExistsError();

  const hashedPassword = await generatePasswordHash(userData.password);
  const hashedUserData = { ...userData, password: hashedPassword };
  const savedUser = await insertUsers(hashedUserData);

  return savedUser[0];
}

async function _getUserFromDatabase(
  userData: TLoginUser
): Promise<TSelectUser> {
  const user = await findUserByEmail(userData.email);
  if (!user.length) throw new BadCredentials();

  const isPasswordCorrect = await validatePasswordHash(
    userData.password,
    user[0].password
  );
  if (!isPasswordCorrect) throw new BadCredentials();

  return user[0];
}
