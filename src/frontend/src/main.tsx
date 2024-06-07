import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
// Tanstack Query configuration
const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    currentUser: undefined!,
    apiClient: undefined!,
  },
});

function App() {
  const currentUser = useCurrentUser();
  const apiClient = useApiClient();
  return (
    <RouterProvider router={router} context={{ currentUser, apiClient }} />
  );
}

ReactDOM.createRoot(document.getElementById("app")!).render(
  // <React.StrictMode >
  <ApiClientProvider>
    <QueryClientProvider client={queryClient}>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </QueryClientProvider>
  </ApiClientProvider>
  // </React.StrictMode>
);
