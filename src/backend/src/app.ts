import { Hono } from "hono";
import { rootRouter } from "./router/root";
import { API_BASE_PATH } from "./config";

const app = new Hono();
// TODO: API_BASE_PATH must be specific value, not some calculated value from .envs ! Only then types will work !
export const router = app.basePath(API_BASE_PATH).route("/", rootRouter);

export default app;
export type ApiClientType = typeof router;
