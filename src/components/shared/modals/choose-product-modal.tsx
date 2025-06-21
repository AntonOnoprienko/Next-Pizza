'use client'

import React from 'react';
import { cn } from '@/src/lib/utils';
import { Dialog, DialogContent, DialogTitle } from '@/src/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm, ChooseProductForm } from '../.';
import { ProductWithRelations } from '@/src/@types/prisma';
import { useCartStore } from '@/src/store';
import { CartItemForToast } from '../cart-item-details/cart-item-details.types';
import { useAddToCartToast } from '@/src/hooks';



type Props = {
  className?: string;
  product: ProductWithRelations;
};

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const isPizza = Boolean(product.items[0].pizzaType)
  const loading = useCartStore(state => state.loading);
  const addToCartToast = useAddToCartToast();

  const handleAddCartItem = (cartItem: CartItemForToast) => {
    addToCartToast(cartItem);
  };

  return (

    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden',
          className)} aria-describedby={undefined}>

        <DialogTitle hidden={true}>Выбор продукта</DialogTitle>

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
      </DialogContent>
    </Dialog>

  );
};
