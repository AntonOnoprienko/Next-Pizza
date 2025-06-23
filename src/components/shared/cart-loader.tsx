'use client'

import { useEffect } from "react";
import { useCartStore } from "@/src/store/cart";

export const CartLoader = () => {
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return null;
};
