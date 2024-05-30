import { ZCreateUserSchema } from "../shared/schemas/user";
import { dbClient } from "./client";
import { faker } from "@faker-js/faker";
import { user } from "./schemas/user";

const DEFAULT_USER_AMOUNT = 10;
const db = dbClient;

type User = typeof user.$inferInsert;

const seedDatabase = async () => {
  console.log("Seeding database...");
  await seedUsers();
};

const seedUsers = async () => {
  console.log("Seeding users...");
  const generatedUsers: User[] = validateAndInsertUsers();

  console.log(`Seeding ${generatedUsers.length} validated users...`);
  await db.insert(user).values(generatedUsers).returning();
};

const validateAndInsertUsers = (amount = DEFAULT_USER_AMOUNT): User[] => {
  const users = Array.from({ length: amount }, () => ({
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

  const validUsers = parsedUsers.filter((user) => user !== null) as User[];

  return validUsers;
};

seedDatabase().finally(async () => {
  console.log("Seeding done!");
  process.exit(0);
});
