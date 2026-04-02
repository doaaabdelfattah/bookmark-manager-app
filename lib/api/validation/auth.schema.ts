import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(5, "minimum 5 characters")
    .max(12, "maximum 12 characters"),
});

export const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type SignUpSchemaInput = z.infer<typeof signUpSchema>;
export type SignInSchemaInput = z.infer<typeof signInSchema>;
