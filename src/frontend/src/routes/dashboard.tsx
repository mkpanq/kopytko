import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useApiClient } from "../lib/hooks/useApiClient";
import { TSelectIssue } from "../../../backend/shared/schemas/issue";
import { Issue } from "../components/issue";
import { issue } from "../../../backend/db/schemas";

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

// TODO: Remove and edit issues
// TODO: Ability to create issues for myself and public
// TODO: Everyone can see public issues and edit them
function Dashboard() {
  const apiClient = useApiClient();
  const data = useSuspenseQuery(issuesQueryOptions(apiClient));
  return (
    <div className="flex w-full">
      <ul className="mx-auto">
        {data.data.map((issue) => (
          <li key={issue.id}>
            <Issue issue={issue} />
          </li>
        ))}
      </ul>
    </div>
  );
}
