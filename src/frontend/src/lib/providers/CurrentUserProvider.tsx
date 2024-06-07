import { createContext, useState } from "react";
import {
  TCurrentUser,
  TTokenUser,
} from "../../../../backend/shared/schemas/user";
import { useApiClient } from "../hooks/useApiClient";

export const CurrentUserContext = createContext<{
  isAuthenticated: boolean;
  currentUser: TCurrentUser;
  fetchCurrentUser: () => Promise<void>;
}>({
  isAuthenticated: false,
  currentUser: {},
  fetchCurrentUser: async () => {},
});

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const apiClient = useApiClient();
  const [currentUser, setCurrentUser] = useState<TCurrentUser>({});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const fetchCurrentUser = async () => {
    const response = await apiClient.me.$get();
    if (response.ok) {
      // if 200 OK, then set user
      const userData: TTokenUser = await response.json();
      setCurrentUser(userData);
      setIsAuthenticated(true);
    } else {
      // if server returns 401 Unauthorized, then set user to null
      setCurrentUser({});
      setIsAuthenticated(false);
    }
  };

  return (
    <CurrentUserContext.Provider
      value={{ isAuthenticated, currentUser, fetchCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
