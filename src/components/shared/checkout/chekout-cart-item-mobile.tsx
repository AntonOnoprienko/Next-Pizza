'use client';

import React from 'react';
import { Trash } from 'lucide-react';
import { CartItemProps } from '../cart-item-details/cart-item-details.types';
import { cn } from '@/src/lib/utils';
import { mapPizzaType } from '@/src/constants/pizza';
import { DynamicCldImage } from '../../dynamics';
import { CountButton } from '..';

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
  const typeName = type !== undefined ? mapPizzaType[type] : undefined;
  return (
    <div className={cn('flex border-b pb-3 gap-2', className)}>
      <div className="w-[100px] h-[100px] shrink-0">
        <DynamicCldImage
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          quality="auto"
          format="auto"
          className={cn('w-[100px] h-[100px]', className)}
          fallbackImage
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-lg font-bold flex-1 leading-6">{name}</h4>
          <button
            aria-label="Удалить товар"
            type="button"
            onClick={onClickRemove}
          >
            <Trash
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={20}
            />
          </button>
        </div>
        <div className="flex flex-col my-2 gap-1">
          {size && typeName && (
            <p className="text-xs text-gray-400">
              {size}см, {typeName} тесто
            </p>
          )}

          {extraIngredients && extraIngredients.length > 0 && (
            <p className="text-xs text-green-600">
              + {extraIngredients.map((i) => i.name).join(', ')}
            </p>
          )}

          {excludedIngredients && excludedIngredients.length > 0 && (
            <p className="text-xs text-red-500">
              – {excludedIngredients.map((i) => i.name).join(', ')}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <CountButton
            loading={loading}
            onClick={onClickCountButton}
            value={quantity}
            isMobile
          />
          <h5 className="font-bold text-xl">{price} ₴</h5>
        </div>
      </div>
    </div>
  );
};
