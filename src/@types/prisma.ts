import { Ingredient, Prisma, Product, ProductItem, ProductItemExtraIngredient } from "@prisma/client";

export type ProductWithRelations = Product & {
  ingredients: Ingredient[];
  items: (ProductItem & {
    extraIngredients: (ProductItemExtraIngredient & {
      ingredient: Ingredient;
    })[];
  })[];
};

export type ProductItemWithExtras = Prisma.ProductItemGetPayload<{
  include: {
    extraIngredients: {
      include: {
        ingredient: true;
      };
    };
  };
}>;
