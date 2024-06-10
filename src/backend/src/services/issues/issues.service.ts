import {
  getIssuesByUserId,
  getIssuesWithoutAndByUserId,
  getIssuesWithoutUserId,
} from "../../../db/repositories/issues.repository";
import { TSelectIssue } from "../../../shared/schemas/issue";

export async function getPublicIssues(): Promise<TSelectIssue[]> {
  return await getIssuesWithoutUserId();
}

export async function getUserIssues(userId: number): Promise<TSelectIssue[]> {
  return await getIssuesByUserId(userId);
}

export async function getPublicAndUserIssues(
  userId: number
): Promise<TSelectIssue[]> {
  return await getIssuesWithoutAndByUserId(userId);
}
