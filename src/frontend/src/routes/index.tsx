import { createFileRoute } from "@tanstack/react-router";
import { useApiClient } from "../lib/hooks/useApiClient";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const apiClient = useApiClient();

  const { status, data, error } = useQuery({
    queryKey: ["indexData"],
    queryFn: async () => {
      // TODO: For now this is the same data as for dashboard
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
