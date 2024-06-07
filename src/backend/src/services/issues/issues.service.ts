import {
  getIssuesByUserId,
  getIssuesWithoutUserId,
} from "../../../db/repositories/issues.repository";
import {
  TSelectPublicIssue,
  TSelectUserIssue,
} from "../../../shared/schemas/issue";

export async function getPublicIssues(): Promise<TSelectPublicIssue[]> {
  const data = await getIssuesWithoutUserId();
  const publicData: TSelectPublicIssue[] = data.map((issue) => {
    const { userId, createdAt, updatedAt, ...rest } = issue;
    return rest;
  });
  return publicData;
}

export async function getUserIssues(
  userId: number
): Promise<TSelectUserIssue[]> {
  const data = await getIssuesByUserId(userId);
  const userData: TSelectUserIssue[] = data.map((issue) => {
    const { userId, createdAt, updatedAt, ...rest } = issue;
    return rest;
  });
  return userData;
}
