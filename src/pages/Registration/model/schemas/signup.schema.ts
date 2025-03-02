import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z
      .string({
        message: "Password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(30, {
        message: "Password must be less than 30 characters",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Passwords must match",
      })
      .max(30, {
        message: "Password must be less than 30 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });
