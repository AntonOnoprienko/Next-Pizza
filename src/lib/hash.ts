import crypto from 'crypto';

export const generateCustomizationHash = (input: {
  productItemId: number;
  excludedIngredients?: number[];
  extraIngredients?: number[];
}) => {
  const data = {
    productItemId: input.productItemId,
    excluded: [...(input.excludedIngredients ?? [])].sort(),
    extra: [...(input.extraIngredients ?? [])].sort(),
  };

  return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
};
