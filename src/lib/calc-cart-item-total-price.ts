import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  console.log(item)
  const extras = item.cartItemExtraIngredients.reduce(
    (acc, e) => acc + e.ingredient.price,
    0
  );

  return (item.productItem.price + extras) * item.quantity;
};