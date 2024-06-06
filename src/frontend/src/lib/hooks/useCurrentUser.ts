import { useContext } from "react";
import { CurrentUserContext } from "../providers/CurrentUserProvider";

export const useCurrentUser = () => {
  const { currentUser, fetchCurrentUser } = useContext(CurrentUserContext);

  if (!fetchCurrentUser) {
    throw new Error(
      "No fetchCurrentUser method set, use CurrectUserProvider to set one"
    );
  }

  return { currentUser, fetchCurrentUser };
};
