import { PizzaSize, PizzaType } from '@/src/constants/pizza';

export interface CartItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;

  size?: PizzaSize;
  type?: PizzaType;
  extraIngredients?: {name: string, price: number}[];
  excludedIngredients?: {name: string}[];
  
}
