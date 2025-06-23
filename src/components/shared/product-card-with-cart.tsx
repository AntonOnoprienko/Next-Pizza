'use client';

import React from 'react';
import { useCartStore } from '@/src/store/cart';
import { CartItemForToast } from './cart-item-details/cart-item-details.types';
import { useAddToCartToast } from '@/src/hooks';
import { ProductCard } from '.';

interface Props {
  id: number;
  productItemId: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string | null;
  ingredients: { name: string }[] | null;
  isPizza: boolean;
}

export const ProductCardWithCart: React.FC<Props> = ({
  id,
  productItemId,
  name,
  price,
  imageUrl,
  description,
  ingredients,
  isPizza,
}) => {
  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.productItemId === productItemId)
  );

  const loadingById = useCartStore(state => state.loadingById);
  const addToCartToast = useAddToCartToast();
  const updateQty = useCartStore((state) => state.updateItemQuantity);
  const removeCartItem = useCartStore((state) => state.removeCartItem);

  const handleAdd = () => {
    const item: CartItemForToast = {
      productItemId,
      name,
      imageUrl,
      price,
    };
    addToCartToast(item);
  };

  const handleQuantityChange = (type: 'plus' | 'minus') => {
  if (!cartItem) return;
  const newQty = type === 'plus' ? cartItem.quantity + 1 : cartItem.quantity - 1;
  if (newQty > 0) {
    updateQty(cartItem.id, newQty);
  }
  if (newQty === 0) {
    removeCartItem(cartItem.id);
  }
};

  const inCart = Boolean(cartItem);

  return (
    <ProductCard
      id={id}
      name={name}
      price={price}
      imageUrl={imageUrl}
      description={description}
      ingredients={ingredients}
      isPizza={isPizza}
      count={cartItem?.quantity}
      inCart={inCart}
      loading={loadingById[cartItem?.id || productItemId] ?? false}
      onAdd={handleAdd}
      onQuantityChange={handleQuantityChange}
    />
  );
};
