import { hc } from "hono/client";
import { ApiClientType } from "../src/app";

export const rpcApiClient = hc<ApiClientType>("/");
