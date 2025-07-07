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
  items: CartItem[];
  totalAmount: number;
  orderId: number;
  paymentId: string;
  address: string;
  paymentDate: string;
}
