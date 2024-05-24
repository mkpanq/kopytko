import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { hc } from "hono/client";
import { ApiClientType } from "../../backend/src/app.ts";
import { ApiClientProvider } from "./lib/providers/ApiClientProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiClientProvider>
      <App />
    </ApiClientProvider>
  </React.StrictMode>
);
