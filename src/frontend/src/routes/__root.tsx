import {
  createRootRouteWithContext,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { Navbar } from "../components/navbar";
import { useCurrentUser } from "../lib/hooks/useCurrentUser";
import { useApiClient } from "../lib/hooks/useApiClient";
import { useEffect } from "react";

interface RouterContext {
  currentUser: ReturnType<typeof useCurrentUser>;
  apiClient: ReturnType<typeof useApiClient>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  loader: async ({ context }) => await context.currentUser.fetchCurrentUser(),
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();
  const { currentUser } = Route.useRouteContext();

  useEffect(() => {
    router.invalidate();
  }, [currentUser.currentUser]);

  return (
    <>
      <Navbar currentUser={currentUser} />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
