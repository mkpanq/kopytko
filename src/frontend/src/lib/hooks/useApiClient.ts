import { useContext } from "react";
import { ApiClientContext } from "../providers/ApiClientProvider";

export const useApiClient = () => {
  const client = useContext(ApiClientContext);

  if (!client) {
    throw new Error("No ApiClient set, use ApiClientProvider to set one");
  }

  return client.api;
};
