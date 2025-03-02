import { z } from "zod";

export const authorizationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(30, { message: "Password must be less than 30 characters long" }),
});
