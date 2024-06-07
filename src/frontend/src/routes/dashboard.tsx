import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  beforeLoad: ({ context }) => {
    if (!context.currentUser.isAuthenticated) {
      redirect({
        to: "/login",
        throw: true,
      });
    }
  },
});

function Dashboard() {
  return;
}
