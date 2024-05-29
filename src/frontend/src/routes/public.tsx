import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/public")({
  component: Public,
});

function Public() {
  return <div>Hello Public !</div>;
}
