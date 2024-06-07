import { useContext } from "react";
import { CurrentUserContext } from "../providers/CurrentUserProvider";

export const useCurrentUser = () => {
  const { isAuthenticated, currentUser, fetchCurrentUser } =
    useContext(CurrentUserContext);

  if (!fetchCurrentUser) {
    throw new Error(
      "No fetchCurrentUser method set, use CurrectUserProvider to set one"
    );
  }

  return { isAuthenticated, currentUser, fetchCurrentUser };
};
