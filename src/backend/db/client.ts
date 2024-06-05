import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import DATABASE_ENVS from "../env/database";

const client = postgres({
  host: DATABASE_ENVS.DATABASE_HOST,
  port: DATABASE_ENVS.DATABASE_PORT,
  username: DATABASE_ENVS.DATABASE_USER,
  password: DATABASE_ENVS.DATABASE_PASSWORD,
  database: DATABASE_ENVS.DATABASE_NAME,
});

export const dbClient = drizzle(client, { logger: true });
