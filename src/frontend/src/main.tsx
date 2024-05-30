import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiClientProvider } from "./lib/providers/ApiClientProvider.tsx";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AppEnvProvider } from "./lib/providers/AppEnvProvider.tsx";

// Tanstack Router configuration
const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
// Tanstack Query configuration
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <AppEnvProvider>
      <ApiClientProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ApiClientProvider>
    </AppEnvProvider>
  </React.StrictMode>
);
