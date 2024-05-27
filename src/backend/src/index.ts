import { serve } from "@hono/node-server";
import app from "./app";
import BACKEND_ENVS from "../env/backend";

const port = BACKEND_ENVS.SERVER_PORT;

console.log(`Server is running on port ${port}`);
serve({ fetch: app.fetch, port });
