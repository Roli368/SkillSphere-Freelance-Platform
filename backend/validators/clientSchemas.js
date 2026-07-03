import { z } from "zod";

export const createClientProfileSchema = z.object({
  companyName: z.string().min(2),

  industry: z.string().optional(),

  website: z.string().optional(),

  description: z.string().optional(),
});

export const updateClientProfileSchema =
  createClientProfileSchema.partial();