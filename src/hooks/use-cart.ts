import React from 'react';
import { CartStateItem, useCartStore } from '../store';

interface ReturnProps {
  totalAmount: number;
  items: CartStateItem[];
  isCartLoading: boolean;
  loadingById: Record<number, boolean>;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  isActionsLoading: boolean;
  countHandlers: Record<number, (type: 'plus' | 'minus') => void>;
  removeHandlers: Record<number, () => void>;
}

export const useCart = (): ReturnProps => {
  const {
    totalAmount,
    items,
    loadingById,
    updateItemQuantity,
    removeCartItem,
    loading,
  } = useCartStore((state) => state);

  const isActionsLoading = React.useMemo(
    () => Object.values(loadingById).some(Boolean),
    [loadingById],
  );

  const onClickCountButton = React.useCallback(
    (id: number, quantity: number, type: 'plus' | 'minus') => {
      const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
      updateItemQuantity(id, newQuantity);
    },
    [updateItemQuantity],
  );

  const removeItem = React.useCallback(
    (id: number) => {
      if (isActionsLoading) return;
      removeCartItem(id);
    },
    [removeCartItem, isActionsLoading],
  );

  const countHandlers = React.useMemo(() => {
    const handlers: Record<number, (type: 'plus' | 'minus') => void> = {};
    items.forEach((item) => {
      handlers[item.id] = (type) =>
        onClickCountButton(item.id, item.quantity, type);
    });
    return handlers;
  }, [items, onClickCountButton]);

  const removeHandlers = React.useMemo(() => {
    const handlers: Record<number, () => void> = {};
    items.forEach((item) => {
      handlers[item.id] = () => {
        removeCartItem(item.id);
      };
    });
    return handlers;
  }, [items, removeCartItem]);

  return {
    totalAmount,
    items,
    loadingById,
    updateItemQuantity,
    removeCartItem,
    isCartLoading: loading,
    isActionsLoading,
    countHandlers,
    removeHandlers,
  };
};
