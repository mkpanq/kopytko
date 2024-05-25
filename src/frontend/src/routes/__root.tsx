import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";

// TODO: Check if there is possible to configure all routes in one, separate file and import
// each url_path per route file
export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
