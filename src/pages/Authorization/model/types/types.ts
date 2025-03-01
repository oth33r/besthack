import { z } from "zod";
import { authorizationSchema } from "../schemas/authorization.schema";

export type AuthorizationFormType = z.infer<typeof authorizationSchema>;
