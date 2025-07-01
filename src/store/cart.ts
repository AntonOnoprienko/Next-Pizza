import { create } from 'zustand';
import { Api } from '../services/api-client';
import { getCartDetails } from '../lib/get-cart-details';
import { CreateCartItemValues } from '../services/dto/cart.dto';

export interface CartStateItem {
  id: number;
  productItemId: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;

  size?: number | null;
  type?: number | null;
  extraIngredients?: { name: string; price: number }[];
  excludedIngredients?: { name: string }[];
}

export interface CartState {
  loading: boolean;
  loadingById: Record<number, boolean>;

  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  loadingById: {},

  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();

      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set((state) => ({
        loadingById: { ...state.loadingById, [id]: true },
        error: false,
      }));
      const data = await Api.cart.updateItemQuantity(id, quantity);

      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set((state) => ({
        loadingById: { ...state.loadingById, [id]: false },
      }));
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        loadingById: { ...state.loadingById, [id]: true },
        error: false,
      }));

      const data = await Api.cart.removeCartItem(id);

      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set((state) => ({
        loadingById: { ...state.loadingById, [id]: false },
      }));
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set((state) => ({
        loadingById: { ...state.loadingById, [values.productItemId]: true },
        error: false,
      }));
      const data = await Api.cart.addCartItem(values);

      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set((state) => ({
        loadingById: { ...state.loadingById, [values.productItemId]: false },
        error: false,
      }));
    }
  },
}));
