import { createContext } from "react";
import { rpcApiClient } from "../../../../backend/shared/apiClient";

export const ApiClientContext = createContext(rpcApiClient);
export const ApiClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ApiClientContext.Provider value={rpcApiClient}>
      {children}
    </ApiClientContext.Provider>
  );
};
