import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";

// TODO: How to store current user session ? Should we just keep cache of /me endpoint data ?
export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
