import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiClientProvider } from "./lib/providers/ApiClientProvider.tsx";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { CurrentUserProvider } from "./lib/providers/CurrentUserProvider.tsx";
import { useCurrentUser } from "./lib/hooks/useCurrentUser.ts";
import { useApiClient } from "./lib/hooks/useApiClient.ts";

// Tanstack Router configuration

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export interface RouterContext {
  currentUser: ReturnType<typeof useCurrentUser>;
  apiClient: ReturnType<typeof useApiClient>;
  queryClient: ReturnType<typeof useQueryClient>;
}

// Tanstack Query configuration
const reactQueryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    currentUser: undefined!,
    apiClient: undefined!,
    queryClient: undefined!,
  },
});

function App() {
  const currentUser = useCurrentUser();
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return (
    <RouterProvider
      router={router}
      context={{ currentUser, apiClient, queryClient }}
    />
  );
}

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <ApiClientProvider>
      <QueryClientProvider client={reactQueryClient}>
        <CurrentUserProvider>
          <App />
        </CurrentUserProvider>
      </QueryClientProvider>
    </ApiClientProvider>
  </React.StrictMode>
);
