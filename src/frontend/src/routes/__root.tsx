import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/navbar/navbar";
import { RouterContext } from "../main";

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
