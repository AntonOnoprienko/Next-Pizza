import { CartStateItem } from "../store/cart";
import { CartDTO } from "../services/dto/cart.dto";

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.cartItems.map(item => ({
    id: item.id,
    quantity: item.quantity,
    price: item.totalPrice,
    size: item.productItem.size,
    type: item.productItem.pizzaType,
    imageUrl: item.productItem.imageUrl || item.productItem.product.imageUrl,
    name: item.productItem.product.name,
    excludedIngredients: item.cartItemExcludedIngredients?.map(e => e.ingredient),
    extraIngredients: item.cartItemExtraIngredients?.map(e => e.ingredient)
  }));

  return {
    items,
    totalAmount: data.totalAmount
  };
};
