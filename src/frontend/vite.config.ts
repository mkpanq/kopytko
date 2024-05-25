import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import VITE_CONFIG_ENVS from "./src/lib/env-validation";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

const DEFAULT_CONFIG = {
  plugins: [react(), TanStackRouterVite()],
};

const LOCAL_DEV_CONFIG = {
  server: {
    proxy: {
      [VITE_CONFIG_ENVS.API_BASE_PATH]: {
        target: `http://localhost:${VITE_CONFIG_ENVS.SERVER_PORT}`,
        changeOrigin: true,
      },
    },
  },
};

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      ...DEFAULT_CONFIG,
      ...LOCAL_DEV_CONFIG,
    };
  }
  return DEFAULT_CONFIG;
});
