import { PizzaSize, PizzaType } from '@/src/constants/pizza';

export interface CartItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;

  size?: PizzaSize;
  type?: PizzaType;
  extraIngredients?: { name: string; price: number }[];
  excludedIngredients?: { name: string }[];
}

// types.ts
export interface CartItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;

  size?: PizzaSize;
  type?: PizzaType;
  extraIngredients?: { name: string; price: number }[];
  excludedIngredients?: { name: string }[];
}

export interface CartItemForToast {
  productItemId: number;
  imageUrl: string;
  name: string;
  price: number;

  excludedIngredients?: number[];
  extraIngredients?: number[];
}
