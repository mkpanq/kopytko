import { createContext } from "react";
import RPC_API_CLIENT from "../../../../backend/shared/apiClient";

export const ApiClientContext = createContext(RPC_API_CLIENT);

export const ApiClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ApiClientContext.Provider value={RPC_API_CLIENT}>
      {children}
    </ApiClientContext.Provider>
  );
};
