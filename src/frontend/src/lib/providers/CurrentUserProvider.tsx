import { createContext, useState } from "react";
import { TTokenUser } from "../../../../backend/shared/schemas/user";
import { useApiClient } from "../hooks/useApiClient";

export const CurrentUserContext = createContext<{
  currentUser: TTokenUser | Record<string, never>;
  fetchCurrentUser: () => Promise<void>;
}>({
  currentUser: {},
  fetchCurrentUser: async () => {},
});

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const apiClient = useApiClient();
  const [currentUser, setCurrentUser] = useState<
    TTokenUser | Record<string, never>
  >({});

  const fetchCurrentUser = async () => {
    const response = await apiClient.me.$get();
    if (response.ok) {
      // if 200 OK, then set user
      const userData: TTokenUser = await response.json();
      setCurrentUser(userData);
    } else {
      // if server returns 401 Unauthorized, then set user to null
      setCurrentUser({});
    }
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
