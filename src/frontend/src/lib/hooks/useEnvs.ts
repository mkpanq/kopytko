import { useContext } from "react";
import { AppEnvContext } from "../providers/AppEnvProvider";

export const useEnvs = () => {
  const envs = useContext(AppEnvContext);

  if (!envs) {
    throw new Error("No AppEnvContext set, use AppEnvProvider to set one");
  }

  return envs;
};
