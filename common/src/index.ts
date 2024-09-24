import zod from "zod";
// Define the user schema
export const signupschema = zod.object({
  name: zod.string().optional(),
  password: zod
    .string()
    .min(6)
    .refine((password) => /[A-Z]/.test(password), {
      message:
        "Password must contain at least one uppercase letter and must be at least 6 characters long",
    }),
  email: zod.string().email(),
});
export type SignupInput = zod.infer<typeof signupschema>;

export const signinschema = zod.object({
  password: zod
    .string()
    .min(6)
    .refine((password) => /[A-Z]/.test(password), {
      message:
        "Password must contain at least one uppercase letter and must be at least 6 characters long",
    }),
  email: zod.string().email(),
});
export type SigninInput = zod.infer<typeof signinschema>;

export const createBlogInput = zod.object({
  title: zod.string(),
  content: zod.string(),
});
export type CreateBlogInput = zod.infer<typeof createBlogInput>;

export const updateBlogInput = zod.object({
  title: zod.string(),
  content: zod.string(),
  id: zod.string(),
});

export type UpdateBlogInput = zod.infer<typeof updateBlogInput>;
