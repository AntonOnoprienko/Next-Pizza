'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/src/store';
import { useAddToCartToast } from '@/src/hooks';
import { ChoosePizzaForm, ChooseProductForm, Container } from '.';
import { CartItemForToast } from './cart-item-details/cart-item-details.types';
import { ProductwithCategory } from '@/src/@types/prisma';



type Props = {
  className?: string;
  product: ProductwithCategory;
};

export const ChooseProductClientWrapper: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const isPizza = Boolean(product.items[0].pizzaType)
  const loading = useCartStore(state => state.loading);
  const addToCartToast = useAddToCartToast();

  const handleAddCartItem = (cartItem: CartItemForToast) => {
    addToCartToast(cartItem);
    router.back();
  };

  return (
    <>
      {isPizza ?

        (<ChoosePizzaForm
          imageUrl={product.imageUrl}
          name={product.name}
          items={product.items}
          ingredients={product.ingredients}
          description={product.description}
          onSubmit={handleAddCartItem}
          loading={loading}
        />)
        :
        (<ChooseProductForm
          description={product.description}
          imageUrl={product.imageUrl}
          name={product.name}
          items={product.items}
          ingredients={product.ingredients}
          onSubmit={handleAddCartItem}
          loading={loading}

        />)}
    </>
  );
};
