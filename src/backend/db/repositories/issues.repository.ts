import { TSelectIssue } from "../../shared/schemas/issue";
import { dbClient } from "../client";
import { issue } from "../schemas";
import { isNull, eq, or } from "drizzle-orm";

export async function getIssuesByUserId(
  userId: number
): Promise<TSelectIssue[]> {
  return dbClient.select().from(issue).where(eq(issue.userId, userId));
}

export async function getIssuesWithoutUserId(): Promise<TSelectIssue[]> {
  return await dbClient.select().from(issue).where(isNull(issue.userId));
}

export async function getIssuesWithoutAndByUserId(
  userId: number
): Promise<TSelectIssue[]> {
  return await dbClient
    .select()
    .from(issue)
    .where(or(eq(issue.userId, userId), isNull(issue.userId)));
}
