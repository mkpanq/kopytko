import {
  createFileRoute,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useApiClient } from "../lib/hooks/useApiClient";

export const Route = createFileRoute("/logout")({
  component: LogoutComponent,
});

function LogoutComponent() {
  const router = useRouterState();
  const navigate = useNavigate({ from: router.location.pathname });
  const apiClient = useApiClient();
  // TODO: Use mutation ?
  // TODO: FIX !
  useEffect(() => {
    apiClient.auth.logout.$delete();
    navigate({ to: "/" });
  }, []);
  return;
}
