import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { user } from "../../db/schemas/user";

export const ZCreateUserSchema = createInsertSchema(user, {
  id: z.coerce.number().optional(),
  username: (schema) =>
    schema.username.min(1, {
      message: "Username must be at least 1 character long",
    }),
  email: (schema) =>
    schema.email.email({
      message: "Email must be a valid email address",
    }),
  password: (schema) =>
    schema.password.min(8, {
      message: "Password must be at least 8 characters long",
    }),
});

export const ZSignupUserSchemaFormValidation = ZCreateUserSchema.extend({
  password_confirmation: z.string(),
})
  .pick({
    username: true,
    email: true,
    password: true,
    password_confirmation: true,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const ZLoginUserSchemaFormValidation = ZCreateUserSchema.pick({
  email: true,
  password: true,
});

export type TLoginUserSchema = z.infer<typeof ZLoginUserSchemaFormValidation>;
export type TSignupUserSchema = z.infer<typeof ZSignupUserSchemaFormValidation>;

export type TSelectUser = typeof user.$inferSelect;
export type TInsertUser = typeof user.$inferInsert;
export type TLoginUser = Pick<TSelectUser, "email" | "password">;
export type TTokenUser = Pick<TSelectUser, "id">;
export type TTokenPayload = {
  user: TTokenUser;
  exp: number;
};
export type TCurrentUser = TTokenUser | Record<string, never>;
