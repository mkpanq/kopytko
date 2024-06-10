import { createInsertSchema } from "drizzle-zod";
import { issue } from "../../db/schemas/issue";
import { z } from "zod";

export const ZCreateIssueSchema = createInsertSchema(issue, {
  title: (schema) =>
    schema.title.min(1, {
      message: "Title must be at least 1 character long",
    }),
  description: (schema) =>
    schema.description.min(1, {
      message: "Description must be at least 1 character long",
    }),
  userId: z.number().optional(),
});

export type TSelectIssue = typeof issue.$inferSelect;
