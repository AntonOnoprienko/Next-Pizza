'use client';

import React from 'react';
import { useCartStore } from '@/src/store/cart';
import { CartItemForToast } from './cart-item-details/cart-item-details.types';
import { useAddToCartToast } from '@/src/hooks';
import { ProductCardMobile, ProductCard } from '.';

interface Props {
  id: number;
  productItemId: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string | null;
  ingredients: { name: string }[] | null;
  isPizza: boolean;
  isMobile: boolean;
  isRetina?: boolean;
}

const ProductCardWithCartComponent: React.FC<Props> = ({
  id,
  productItemId,
  name,
  price,
  imageUrl,
  description,
  ingredients,
  isPizza,
  isMobile,
  isRetina,
}) => {
  const cartItem = useCartStore(
    React.useCallback(
      (state) =>
        state.items.find((item) => item.productItemId === productItemId),
      [productItemId],
    ),
  );

  const loading = useCartStore(
    (state) => state.loadingById[cartItem?.id || productItemId] ?? false,
  );

  const addToCartToast = useAddToCartToast();
  const updateQty = useCartStore((state) => state.updateItemQuantity);
  const removeCartItem = useCartStore((state) => state.removeCartItem);

  const handleAdd = React.useCallback(() => {
    const item: CartItemForToast = {
      productItemId,
      name,
      imageUrl,
      price,
    };

    addToCartToast(item);
  }, [productItemId, name, imageUrl, price, addToCartToast]);

  const handleQuantityChange = React.useCallback(
    (type: 'plus' | 'minus') => {
      if (!cartItem) return;
      const newQty =
        type === 'plus' ? cartItem.quantity + 1 : cartItem.quantity - 1;

      if (newQty > 0) {
        updateQty(cartItem.id, newQty);
      }
      if (newQty === 0) {
        removeCartItem(cartItem.id);
      }
    },
    [cartItem, updateQty, removeCartItem],
  );

  const inCart = Boolean(cartItem);

  const commonProps = {
    id,
    name,
    price,
    imageUrl,
    description,
    ingredients,
    isPizza,
    count: cartItem?.quantity,
    inCart,
    loading,
    onAdd: handleAdd,
    onQuantityChange: handleQuantityChange,
  };

  return isMobile ? (
    <ProductCardMobile {...commonProps} isRetina={isRetina} />
  ) : (
    <ProductCard {...commonProps} />
  );
};

export const ProductCardWithCart = React.memo(ProductCardWithCartComponent);
