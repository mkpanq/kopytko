import { createFileRoute } from "@tanstack/react-router";
import { useCurrentUser } from "../lib/hooks/useCurrentUser";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { currentUser, fetchCurrentUser } = useCurrentUser();
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div>
      <p>{currentUser?.email}</p>
    </div>
  );
}
