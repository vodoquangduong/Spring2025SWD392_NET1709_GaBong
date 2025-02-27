import { z } from "zod";

export const formSchema = () => {
  return z.object({
    projectName: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters"),
    projectDescription: z
      .string()
      .min(20, "Description must be at least 20 characters")
      .max(1000, "Description must be less than 1000 characters"),
    location: z.string().min(1, "Required"),
    skillsRequired: z.string().optional(),
    estimateBudget: z.coerce
      .number()
      .min(100, "Budget must be at least 100$")
      .max(1000000, "Budget must be less than 1000000$"),
    availableTimeRange: z.coerce
      .number()
      .min(10, "Range must be at least 10 days")
      .max(30, "Range must be less than 30 days"),
  });
};
