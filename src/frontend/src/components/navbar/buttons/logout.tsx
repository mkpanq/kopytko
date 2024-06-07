import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Route } from "../../../routes";
import { useApiClient } from "../../../lib/hooks/useApiClient";
import { useCurrentUser } from "../../../lib/hooks/useCurrentUser";

export function LogoutButton() {
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });

  const apiClient = useApiClient();
  const { fetchCurrentUser } = useCurrentUser();

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
      router.invalidate();
      navigate({ to: "/" });
    },
  });

  return <button onClick={() => mutation.mutate()}>Logout</button>;
}
