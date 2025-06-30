import { prisma } from '../../prisma-client';
import { Product } from '@prisma/client';
import { seedProductItems } from './product-items';

const ingredientIds = Array.from({ length: 21 }, (_, i) => i + 1);

export const extrasSeed = async (pizzas: Product[]) => {
  const productItemsData = await seedProductItems(pizzas);

  for (const itemData of productItemsData) {
    const createdItem = await prisma.productItem.create({ data: itemData });

    const filteredIngredientIds =
      itemData.size === 20 || itemData.pizzaType === 2
        ? ingredientIds.filter((id) => id !== 1)
        : ingredientIds;

    const extrasData = filteredIngredientIds.map((ingredientId) => ({
      productItemId: createdItem.id,
      ingredientId,
    }));

    await prisma.productItemExtraIngredient.createMany({ data: extrasData });
  }
};
