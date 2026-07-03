import { z } from "zod";

export const createFreelancerProfileSchema = z.object({
  headline: z.string().min(5).max(100),

  bio: z.string().min(20).max(1000),

  hourlyRate: z.number().min(0),

  availability: z
    .enum(["available", "busy", "offline"])
    .default("available"),

  languages: z.array(z.string()).optional(),

  skills: z.array(
    z.object({
      name: z.string().min(2),

      level: z.enum([
        "Beginner",
        "Intermediate",
        "Advanced",
        "Expert",
      ]),
    })
  ),

  experience: z.array(
    z.object({
      company: z.string(),

      position: z.string(),

      startDate: z.string(),

      endDate: z.string().optional(),

      currentlyWorking: z.boolean(),

      description: z.string().optional(),
    })
  ).optional(),

  education: z.array(
    z.object({
      institute: z.string(),

      degree: z.string(),

      fieldOfStudy: z.string().optional(),

      startYear: z.number(),

      endYear: z.number(),
    })
  ).optional(),
});

export const updateFreelancerProfileSchema =
  createFreelancerProfileSchema.partial();