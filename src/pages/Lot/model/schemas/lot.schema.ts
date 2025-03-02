import { z } from "zod";

export const lotSchema = z.object({
  id: z.string(),
  nbCode: z.number().int(),
  fuelCode: z.number().int(),
  availableBalance: z.string(),
  status: z.string(),
});
