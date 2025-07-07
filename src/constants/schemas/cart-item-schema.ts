import z from 'zod';

export const cartItemSchema = z.object({
  productItemId: z.number(),
  excludedIngredients: z.array(z.number()).optional(),
  extraIngredients: z.array(z.number()).optional(),
});

export type CartItemSchema = z.infer<typeof cartItemSchema>;
