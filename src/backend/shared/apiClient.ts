import { hc } from "hono/client";
import { ApiClientType } from "../src/app";

// TODO: Think about move this folder outside of both application, just configure path in package.json / tsconfig
const RPC_API_CLIENT = hc<ApiClientType>("/");
export default RPC_API_CLIENT;
