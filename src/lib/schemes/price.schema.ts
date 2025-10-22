import { z } from "zod";

export const priceFilterSchema = z
  .object({
    // min price (can be empty)
    min: z.number().min(0).max(1_000_000).optional(),

    // max price (can be empty)
    max: z.number().min(0).max(1_000_000).optional(),
  })
  // make sure min <= max
  .refine(
    (data) =>
      data.min === undefined ||
      data.max === undefined ||
      data.min <= data.max,
    {
      message: "Minimum must be less than or equal to maximum",
      path: ["max"],
    }
  );

// inferred type for TypeScript
export type PriceFilterValues = z.infer<typeof priceFilterSchema>;
