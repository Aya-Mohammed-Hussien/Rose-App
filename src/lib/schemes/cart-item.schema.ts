// ===============================================================
// Schema: quantitySchema
// Validates product quantity input using Zod
// ===============================================================

import z from "zod";

// Define validation rules
export const quantitySchema = z.object({
  quantity: z
    .number()
    .min(1, 'Quantity must be at least 1'), // ensure quantity ≥ 1
});

// Infer TypeScript type from schema
export type QuantityValues = z.infer<typeof quantitySchema>;
