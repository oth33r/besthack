import { z } from "zod";

export const authorizationSchema = z.object({
  email: z.string().email({ message: "Неверный email" }),
  password: z
    .string({ message: "Пароль обязателен" })
    .min(8, { message: "Пароль должен содержать не менее 8 символов" })
    .max(30, { message: "Пароль должен содержать не более 30 символов" }),
});
