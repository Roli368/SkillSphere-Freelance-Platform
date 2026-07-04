import { z } from "zod";

export const proposalSchema = z.object({
  coverLetter: z
    .string()
    .min(
      30,
      "Cover letter must contain at least 30 characters."
    ),

  bidAmount: z.coerce
    .number()
    .positive(),

  estimatedDays: z.coerce
    .number()
    .positive(),
});