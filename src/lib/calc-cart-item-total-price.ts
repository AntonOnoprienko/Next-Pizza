import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const extras = item.productItem.extraIngredients.reduce(
    (acc, e) => acc + e.ingredient.price,
    0
  );

  return (item.productItem.price + extras) * item.quantity;
};