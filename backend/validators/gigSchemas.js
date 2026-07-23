import { z } from "zod";

export const createGigSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters.")
    .max(100, "Title cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters.")
    .max(1000, "Description cannot exceed 1000 characters."),

  category: z
    .string()
    .trim()
    .min(1, "Category is required."),

  skills: z
    .array(z.string())
    .min(1, "At least one skill is required."),

  budget: z
    .coerce
    .number({
      invalid_type_error: "Budget must be a number.",
    })
    .positive("Budget must be greater than 0."),

  deadline: z
    .string()
    .min(1, "Deadline is required."),

  experienceLevel: z.enum(
    ["Beginner", "Intermediate", "Expert"],
    {
      errorMap: () => ({
        message: "Please select an experience level.",
      }),
    }
  ),
});

export const updateGigSchema =
  createGigSchema.partial();