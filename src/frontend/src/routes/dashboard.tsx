import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../lib/hooks/useApiClient";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const apiClient = useApiClient();

  const { status, data, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const res = await apiClient.dashboard.$get();
      return await res.text();
    },
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <p>{data}</p>
    </div>
  );
}
