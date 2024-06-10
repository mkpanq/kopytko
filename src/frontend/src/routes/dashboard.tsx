import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useApiClient } from "../lib/hooks/useApiClient";
import { TSelectIssue } from "../../../backend/shared/schemas/issue";

const issuesQueryOptions = (apiClient: ReturnType<typeof useApiClient>) => {
  return queryOptions({
    queryKey: ["issues"],
    queryFn: async (): Promise<TSelectIssue[]> => {
      const data = await apiClient.issues.$get();
      return (await data.json()) as TSelectIssue[];
    },
  });
};

export const Route = createFileRoute("/dashboard")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(issuesQueryOptions(context.apiClient));
  },
  component: Dashboard,
});

function Dashboard() {
  const apiClient = useApiClient();
  const data = useSuspenseQuery(issuesQueryOptions(apiClient));
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data.data.map((issue) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
    </div>
  );
}
