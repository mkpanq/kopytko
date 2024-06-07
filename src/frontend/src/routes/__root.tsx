import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { useCurrentUser } from "../lib/hooks/useCurrentUser";
import { useApiClient } from "../lib/hooks/useApiClient";
import { Navbar } from "../components/navbar/navbar";

interface RouterContext {
  currentUser: ReturnType<typeof useCurrentUser>;
  apiClient: ReturnType<typeof useApiClient>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    context.currentUser.fetchCurrentUser();
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
