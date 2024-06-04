import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../lib/hooks/useApiClient";

export const Route = createFileRoute("/issues")({
  component: Public,
});

function Public() {
  const apiClient = useApiClient();

  const { status, data, error } = useQuery({
    queryKey: ["issuesData"],
    queryFn: async () => {
      const res = await apiClient.issues.$get();
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
