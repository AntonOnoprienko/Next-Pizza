type Ingredient = {
  name: string;
  price?: number;
};

export type CartItem = {
  name: string;
  quantity: number;
  price: number;
  type?: string;
  size?: string;
  extraIngredients?: string[];
  excludedIngredients?: string[];
};

export interface OrderConfirmEmailProps {
  fullName: string;
  items: CartItem[];
  totalAmount: number;
  paymentUrl: string;
  address: string;
}

export interface PaymentSuccessEmailProps {
  fullName: string;
  items: CartItemWithIngredients[];
  totalAmount: number;
  orderId: number;
  paymentId: string;
  address: string;
  paymentDate: string;
}

export type CartItemWithIngredients = {
  name: string;
  quantity: number;
  price: number;
  type?: string | number;
  size?: string | number;
  extraIngredients?: Ingredient[];
  excludedIngredients?: Ingredient[];
};
