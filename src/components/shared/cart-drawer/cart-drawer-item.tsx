import { cn } from '@/src/lib/utils';
import React from 'react';

import * as CartItem from '../cart-item-details';
import { CartItemProps } from '../cart-item-details/cart-item-details.types';
import { Trash2Icon } from 'lucide-react';
import { CountButton } from '..';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
  loading: boolean;
}

const CartDrawerItemComponent: React.FC<Props> = ({
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
    <div className={cn('flex bg-white p-4 gap-4 sm:p-5 sm:gap-6', className)}>
      <CartItem.Image src={imageUrl} name={name} />

      <div className="flex-1">
        <CartItem.Info
          name={name}
          size={size}
          type={type}
          extraIngredients={extraIngredients}
          excludedIngredients={excludedIngredients}
        />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton
            onClick={onClickCountButton}
            value={quantity}
            loading={loading}
          />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              onClick={loading ? undefined : onClickRemove}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CartDrawerItem = React.memo(CartDrawerItemComponent);
