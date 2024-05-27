import { defineConfig } from "drizzle-kit";
import DATABASE_ENVS from "./env/database";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schemas/*",
  out: "./db/migrations",
  dbCredentials: {
    host: DATABASE_ENVS.DATABASE_HOST,
    port: DATABASE_ENVS.DATABASE_PORT,
    user: DATABASE_ENVS.DATABASE_USER,
    password: DATABASE_ENVS.DATABASE_PASSWORD,
    database: DATABASE_ENVS.DATABASE_NAME,
  },
});
