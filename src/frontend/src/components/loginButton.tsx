import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useApiClient } from "../lib/hooks/useApiClient";
import { Route } from "../routes";
import { TCurrentUser } from "../../../backend/shared/schemas/user";
import { isLoggedIn } from "../lib/utils";

export function LoginButton({ currentUser }: { currentUser: TCurrentUser }) {
  const router = useRouter();
  const apiClient = useApiClient();
  const navigate = useNavigate({ from: Route.fullPath });

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await apiClient.auth.logout.$delete();
      if (!response.ok) throw Error(await response.text());
    },
    onSuccess: async () => {
      router.invalidate();
      navigate({ to: "/" });
    },
  });

  return isLoggedIn(currentUser) ? (
    <button onClick={() => mutation.mutate()}>Logout</button>
  ) : (
    <Link to="/login">Login</Link>
  );
}
