'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui';
import { CartDrawer } from '.';
import { useCartStore } from '@/src/store';

export const CartButtonMobile: React.FC = () => {
  const { totalAmount, items, loading } = useCartStore((state) => state);
  const totalCount = items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <CartDrawer>
      <button
        aria-label={`Корзина, товаров: ${totalCount}, сумма: ${totalAmount || 0} грн`}
        disabled={loading}
        className="relative w-12 h-12 p-3"
      >
        <ShoppingCart size={20} />
        {totalCount > 0 && (
          <span className="absolute top-0 right-4 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#FF5E00] text-[10px] text-white">
            {totalCount}
          </span>
        )}
      </button>
    </CartDrawer>
  );
};
