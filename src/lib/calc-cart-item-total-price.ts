import { LightCartItemDTO } from '../services/dto/cart.dto';

export const calcCartItemTotalPrice = (item: LightCartItemDTO): number => {
  const extras = item.cartItemExtraIngredients.reduce(
    (acc, e) => acc + e.ingredient.price,
    0,
  );

  return (item.productItem.price + extras) * item.quantity;
};
