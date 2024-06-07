import {
  createRootRouteWithContext,
  Outlet,
  useRouteContext,
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
