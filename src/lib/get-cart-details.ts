import { CartStateItem } from "../store/cart";
import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

interface ReturnProps {
    items: CartStateItem [];
    totalAmount: number;

}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    console.log(data,9999999)
    const items = data.cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: calcCartItemTotalPrice(item),
      size: item.productItem.size,
      type: item.productItem.pizzaType,
      imageUrl: item.productItem.imageUrl || item.productItem.product.imageUrl,
      name: item.productItem.product.name,
      excludedIngredients: item.ingredients,
      extraIngredients: item.productItem.extraIngredients?.map(e => e.ingredient) || []

    }));

    return {
        items,
        totalAmount: data.totalAmount
    }
};