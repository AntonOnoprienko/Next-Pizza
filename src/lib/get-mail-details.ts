import {
  mapPizzaSize,
  mapPizzaType,
  PizzaSize,
  PizzaType,
} from '../constants/pizza';
import { CartStateItem } from '../store';

interface MailCartItem {
  name: string;
  quantity: number;
  price: number;
  type?: string;
  size?: string;
  extraIngredients?: string[];
  excludedIngredients?: string[];
}

export function getMailDetails(items: CartStateItem[]): MailCartItem[] {
  return items.map(
    ({
      name,
      quantity,
      price,
      type,
      size,
      extraIngredients,
      excludedIngredients,
    }) => ({
      name,
      quantity,
      price,
      type: type ? mapPizzaType[type as PizzaType] : undefined,
      size: size ? mapPizzaSize[size as PizzaSize] : undefined,
      extraIngredients: extraIngredients?.map((i) => i.name),
      excludedIngredients: excludedIngredients?.map((i) => i.name),
    }),
  );
}
