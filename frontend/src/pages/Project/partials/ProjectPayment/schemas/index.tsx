import { z } from "zod";

export const schema = () => {
  return z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    skillsRequired: z.string().optional(),
    estimatedBudget: z.string().optional(),
    biddingDeadline: z.string().optional(),
  });
};
