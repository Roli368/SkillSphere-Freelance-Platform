import { z } from "zod";

export const gigSchema = z.object({
  title: z
    .string()
    .min(5, "Title must contain minimum 5 characters."),

  description: z
    .string()
    .min(20, "Description must contain minimum 20 characters."),

  category: z
    .string()
    .min(1, "Category is required."),

  budget: z.coerce
    .number()
    .positive("Budget should be greater than 0."),

  skills: z
    .string()
    .min(1, "Enter at least one skill."),

  deadline: z
    .string()
    .min(1, "Deadline is required."),

  experienceLevel: z.enum([
    "Beginner",
    "Intermediate",
    "Expert",
  ]),
});