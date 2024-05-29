import { Hono } from "hono";
import { rootRouter } from "./router/root";
import BACKEND_ENVS from "../env/backend";

const API_BASE_PATH = BACKEND_ENVS.API_BASE_PATH;

const app = new Hono();
export const router = app.basePath(API_BASE_PATH).route("/", rootRouter);

export default app;
export type ApiClientType = typeof router;
