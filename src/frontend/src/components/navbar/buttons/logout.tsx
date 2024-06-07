import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../../../lib/hooks/useApiClient";
import { useCurrentUser } from "../../../lib/hooks/useCurrentUser";
import { useInvalidateRouter } from "../../../lib/hooks/useInvalidateRouter";
import { Route } from "../../../routes";

export function LogoutButton() {
  const apiClient = useApiClient();
  const { fetchCurrentUser } = useCurrentUser();
  const redirect = useInvalidateRouter(Route.fullPath, "/");

  // TODO: Export mutation to separate file ! Especially with future issues calls
  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await apiClient.auth.logout.$delete();
      if (!response.ok) throw Error(await response.text());
      console.log("Logout !");
    },
    onSuccess: async () => {
      await fetchCurrentUser();
      redirect();
    },
  });

  return <button onClick={() => mutation.mutate()}>Logout</button>;
}
