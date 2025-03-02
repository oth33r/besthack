import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email({
      message: "Неверный email",
    }),
    password: z
      .string({
        message: "Пароль обязателен",
      })
      .min(8, {
        message: "Пароль должен содержать не менее 8 символов",
      })
      .max(30, {
        message: "Пароль должен содержать не более 30 символов",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Пароли должны совпадать",
      })
      .max(30, {
        message: "Пароль должен содержать не более 30 символов",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли должны совпадать",
  });
