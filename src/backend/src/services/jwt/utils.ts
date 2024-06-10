import {
  TSelectUser,
  TTokenPayload,
  TTokenUser,
} from "../../../shared/schemas/user";

export function transformUserDataToTokenDataFormat(
  user: TSelectUser
): TTokenPayload {
  const userData: TTokenUser = { id: user.id };
  const expirationTime: number = Math.floor(Date.now() / 1000) + 60 * 60;

  return {
    user: userData,
    exp: expirationTime,
  };
}
