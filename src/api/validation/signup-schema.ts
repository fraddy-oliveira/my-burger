import { z } from "zod";
import { loginSchema } from "./login-schema";

const schema = z.object({
  password: z
    .string()
    .min(8)
    .max(20)
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password should contain atleast 1 uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password should contain atleast 1 lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password should contain atleast 1 number",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "Password should contain atleast 1 symbol (!@#$%^&*)",
    }),
});

export const signupSchema = loginSchema.merge(schema);
