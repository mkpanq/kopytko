import { createContext } from "react";
import { FRONTEND_ENVS } from "../../../env/frontend";

export const AppEnvContext = createContext(FRONTEND_ENVS);
export const AppEnvProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppEnvContext.Provider value={FRONTEND_ENVS}>
      {children}
    </AppEnvContext.Provider>
  );
};
