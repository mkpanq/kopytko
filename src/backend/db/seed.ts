import { ZCreateUserSchema } from "../shared/schemas/user";
import { dbClient } from "./client";
import { faker } from "@faker-js/faker";
import { user, issue } from "./schemas";
import { ZCreateIssueSchema } from "../shared/schemas/issue";

const DEFAULT_USER_AMOUNT = 3;
const DEFAULT_ISSUE_AMOUNT_PUBLIC = 5;
const DEFAULT_ISSUE_AMOUNT_PER_USER = 5;
const db = dbClient;

type User = typeof user.$inferInsert;
type Issue = typeof issue.$inferInsert;

const seedDatabase = async () => {
  console.log("Seeding database...");
  await seedData();
};

const seedData = async () => {
  const users = generateUsers();
  const issues = generateIssues(users);

  console.log(
    `Seeding ${users.length} validated users with ${issues.length} issues...`
  );
  await db.insert(user).values(users).onConflictDoNothing();
  await db.insert(issue).values(issues).onConflictDoNothing();
};

const generateIssues = (users: User[]): Issue[] => {
  const generateIssuesForUser = (userId: User["id"]) => {
    const generatedUserIssues = generateAndParseIssues(
      DEFAULT_ISSUE_AMOUNT_PER_USER,
      userId
    );
    console.log(
      `Generated ${generatedUserIssues.length} issues for user ${userId}...`
    );
    return generatedUserIssues;
  };

  const generateIssuesForPublic = () => {
    const generatedPublicIssues = generateAndParseIssues(
      DEFAULT_ISSUE_AMOUNT_PUBLIC
    );
    console.log(`Generated ${generatedPublicIssues.length} issues for public`);
    return generatedPublicIssues;
  };

  const publicIssues = generateIssuesForPublic();
  const userIssues = users.flatMap((user) => generateIssuesForUser(user.id));

  return [...publicIssues, ...userIssues];
};

const generateUsers = () => {
  console.log("Generate users...");
  return generateAndParseUsers();
};

const generateAndParseUsers = (amount = DEFAULT_USER_AMOUNT): User[] => {
  const users = Array.from({ length: amount }, () => ({
    id: faker.number.int(1000),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }));

  const parsedUsers = users.map((user) => {
    try {
      return ZCreateUserSchema.parse(user);
    } catch {
      return null;
    }
  });

  return parsedUsers.filter((user) => user !== null) as User[];
};

const generateAndParseIssues = (
  amount: number,
  userId?: User["id"] | undefined
) => {
  const issues = Array.from({ length: amount }, () => ({
    title: faker.lorem.sentence(5),
    description: faker.lorem.sentence(),
    userId: userId,
  }));

  const parsedIssues = issues.map((issue) => {
    try {
      return ZCreateIssueSchema.parse(issue);
    } catch {
      return null;
    }
  });

  return parsedIssues.filter((issue) => issue !== null) as Issue[];
};

await seedDatabase().finally(async () => {
  console.log("Seeding done!");
  process.exit(0);
});
