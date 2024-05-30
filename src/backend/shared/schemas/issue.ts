import { createInsertSchema } from "drizzle-zod";
import { issue } from "../../db/schemas/issue";

export const ZCreateIssueSchema = createInsertSchema(issue, {
  title: (schema) =>
    schema.title.min(1, {
      message: "Title must be at least 1 character long",
    }),
  description: (schema) =>
    schema.description.email({
      message: "Description must be at least 1 character long",
    }),
});
