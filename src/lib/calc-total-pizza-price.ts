import { Ingredient } from '@prisma/client';

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @param basePrice - цена пиццы
 * @param extraIngredients - дополнительные ингредиенты
 * @param selectedIngredients - выбранные ингредиенты
 * @returns  number возвращает общую цену
 */

export function calcTotalPizzaPrice(
  basePrice: number,
  extraIngredients: Array<{ ingredient: Ingredient }>,
  selectedIngredients: Set<number>,
) {
  const totalIngredientsPrice = extraIngredients
    .filter(({ ingredient }) => selectedIngredients.has(ingredient.id))
    .reduce((acc, { ingredient }) => acc + ingredient.price, 0);

  return basePrice + totalIngredientsPrice;
}
