import { z } from "zod";
import { signupSchema } from "../schemas/signup.schema";

export type SignupFormType = z.infer<typeof signupSchema>;
