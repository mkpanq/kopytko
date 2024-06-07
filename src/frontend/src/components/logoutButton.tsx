import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useApiClient } from "../lib/hooks/useApiClient";
import { useMutation } from "@tanstack/react-query";

export function LogoutButton() {
  const apiClient = useApiClient();
  const router = useRouterState();
  const navigate = useNavigate({ from: router.location.pathname });

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await apiClient.auth.logout.$delete();
      if (!response.ok) throw Error(await response.text());
    },
    onSuccess: async () => {
      navigate({ to: "/" });
    },
    onError: () => {
      navigate({ to: "/" });
    },
  });

  const onSubmit = () => {
    mutation.mutate();
  };

  return <button onClick={() => onSubmit()}>Logout</button>;
}
