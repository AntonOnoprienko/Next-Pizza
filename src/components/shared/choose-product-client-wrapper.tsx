'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/src/store';
import { useAddToCartToast } from '@/src/hooks';
import { ChooseProductFormRenderer } from '.';
import { CartItemForToast } from './cart-item-details/cart-item-details.types';
import { ProductwithCategory } from '@/src/@types/prisma';

type Props = {
  className?: string;
  product: ProductwithCategory;
};

export const ChooseProductClientWrapper: React.FC<Props> = ({
  className,
  product,
}) => {
  const router = useRouter();
  const loadingById = useCartStore((state) => state.loadingById);
  const addToCartToast = useAddToCartToast();

  const handleAddCartItem = (cartItem: CartItemForToast) => {
    addToCartToast(cartItem);
  };

  return (
    <ChooseProductFormRenderer
      product={product}
      loadingById={loadingById}
      onSubmit={handleAddCartItem}
    />
  );
};
