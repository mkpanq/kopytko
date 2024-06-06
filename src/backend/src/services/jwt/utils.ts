import { TSelectUser, TTokenUser } from "../../../shared/schemas/user";

export function transformUserDataToTokenDataFormat(
  user: TSelectUser
): TTokenUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
  };
}
