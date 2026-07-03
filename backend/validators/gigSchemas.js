import { z } from "zod";

export const createGigSchema = z.object({
  title: z.string().min(5),

  description: z.string().min(20),

  category: z.string(),

  skills: z.array(z.string()),

  budget: z.number().positive(),

  deadline: z.string(),

  experienceLevel: z.enum([
    "Beginner",
    "Intermediate",
    "Expert",
  ]),
});

export const updateGigSchema =
  createGigSchema.partial();