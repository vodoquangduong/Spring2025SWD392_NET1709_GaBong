import { z } from "zod";

export const reportFormSchema = () => {
  return z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    skillsRequired: z.string().optional(),
    estimatedBudget: z.string().optional(),
    biddingDeadline: z.string().optional(),
  });
};

export const bidFormSchema = () => {
  return z.object({
    projectId: z.string().optional(),
    bidOffer: z.coerce
      .number()
      .min(20, "Bid must be greater than 20")
      .max(10000000, "Bid must be less than 10000000"),
    bidDescription: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(100, "Description must be less than 100 characters"),
  });
};
