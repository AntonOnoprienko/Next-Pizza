import { ZodSchema } from 'zod';

export function parseSafe<T>(
  schema: ZodSchema<T>,
  data: unknown,
  context: string,
): T {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    console.error(`❌ Validation failed [${context}]`, parsed.error.flatten());
    throw new Error(`Invalid data in ${context}`);
  }
  return parsed.data;
}
