import { dbClient } from "../client";
import { eq } from "drizzle-orm";
import { T_I_User, T_S_User, user } from "../schemas";

export async function insertUsers(
  users: T_I_User | T_I_User[]
): Promise<T_S_User[]> {
  const userArray = Array.isArray(users) ? users : [users];
  return await dbClient.insert(user).values(userArray).returning();
}

export async function findUserByEmail(email: string): Promise<T_S_User[]> {
  return await dbClient.select().from(user).where(eq(user.email, email));
}
