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

export const CheckoutCartItem: React.FC<Props> = ({
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
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center gap-5 flex-1">
        <CartItem.Image src={imageUrl} name={name} />
        <CartItem.Info
          name={name}
          size={size}
          type={type}
          extraIngredients={extraIngredients}
          excludedIngredients={excludedIngredients}
        />
      </div>

      <CartItem.Price value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItem.CountButton
          loading={loading}
          onClick={onClickCountButton}
          value={quantity}
        />
        <button type="button" onClick={onClickRemove}>
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};
