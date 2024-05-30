import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../lib/hooks/useApiClient";

export const Route = createFileRoute("/public")({
  component: Public,
});

function Public() {
  const apiClient = useApiClient();

  const { status, data, error } = useQuery({
    queryKey: ["publicData"],
    queryFn: async () => {
      const res = await apiClient.public.$get();
      return await res.json();
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
      <h1>Public</h1>
      <p>{data.publicMessage}</p>

      <h1>Auth</h1>
      <p>{data.authUserMessage}</p>
    </div>
  );
}
