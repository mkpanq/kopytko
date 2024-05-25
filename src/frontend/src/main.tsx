import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ApiClientProvider } from "./lib/providers/ApiClientProvider.tsx";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <ApiClientProvider>
      <RouterProvider router={router} />
    </ApiClientProvider>
  </React.StrictMode>
);
