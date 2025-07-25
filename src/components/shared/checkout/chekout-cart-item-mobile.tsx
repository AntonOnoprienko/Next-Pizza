'use client';

import React from 'react';
import { X } from 'lucide-react';
import * as CartItem from '../cart-item-details';
import { CartItemProps } from '../cart-item-details/cart-item-details.types';
import { cn } from '@/src/lib/utils';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
  loading: boolean;
}

export const CheckoutCartItemMobile: React.FC<Props> = ({
  imageUrl,
  name,
  size,
  type,
  extraIngredients,
  excludedIngredients,
  price,
  quantity,
  loading,
  onClickCountButton,
  onClickRemove,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-3 py-4 border-b', className)}>
      <div className="flex gap-4">
        <CartItem.Image src={imageUrl} name={name} />
        <div className="flex flex-col gap-1">
          <CartItem.Info
            name={name}
            size={size}
            type={type}
            extraIngredients={extraIngredients}
            excludedIngredients={excludedIngredients}
          />
          <CartItem.Price value={price} />
        </div>
      </div>

      <div className="flex items-center justify-between px-1">
        <CartItem.CountButton
          loading={loading}
          onClick={onClickCountButton}
          value={quantity}
        />
        <button
          aria-label="Удалить товар"
          type="button"
          onClick={onClickRemove}
        >
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};
