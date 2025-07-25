'use client';

import React from 'react';
import { cn } from '@/src/lib/utils';
import { Dialog, DialogContent, DialogTitle } from '@/src/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ChooseProductFormRenderer } from '../.';
import { ProductWithRelations } from '@/src/@types/prisma';
import { useCartStore } from '@/src/store';
import { CartItemForToast } from '../cart-item-details/cart-item-details.types';
import { useAddToCartToast } from '@/src/hooks';

type Props = {
  className?: string;
  product: ProductWithRelations;
  isMobile?: boolean;
};

export const ChooseProductModal: React.FC<Props> = ({
  className,
  product,
  isMobile = false,
}) => {
  const router = useRouter();
  const loadingById = useCartStore((state) => state.loadingById);
  const addToCartToast = useAddToCartToast();

  const handleAddCartItem = (cartItem: CartItemForToast) => {
    addToCartToast(cartItem);
    router.back();
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 bg-white overflow-hidden min-h-[550px]',
          isMobile ? 'w-full' : 'w-[1060px] max-w-[1060px]',
          className,
        )}
        aria-describedby={undefined}
      >
        <DialogTitle hidden={true}>Выбор продукта</DialogTitle>

        <ChooseProductFormRenderer
          product={product}
          loadingById={loadingById}
          onSubmit={handleAddCartItem}
          isMobile={isMobile}
        />
      </DialogContent>
    </Dialog>
  );
};
