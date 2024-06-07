import { TInsertUser, TSelectUser } from "../../shared/schemas/user";
import { dbClient } from "../client";
import { eq } from "drizzle-orm";
import { user } from "../schemas";

export async function insertUsers(
  users: TInsertUser | TInsertUser[]
): Promise<TSelectUser[]> {
  const userArray = Array.isArray(users) ? users : [users];
  return await dbClient.insert(user).values(userArray).returning();
}

export async function findUserByEmail(email: string): Promise<TSelectUser[]> {
  return await dbClient.select().from(user).where(eq(user.email, email));
}
