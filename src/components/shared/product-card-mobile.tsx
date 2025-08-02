'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import { ProductCardActions, Title } from '.';
import { DynamicCldImage } from '../dynamics';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string | null;
  ingredients: { name: string }[] | null;
  isPizza: boolean;
  count?: number;
  inCart: boolean;
  loading?: boolean;
  onAdd?: () => void;
  onQuantityChange?: (type: 'plus' | 'minus') => void;
  isRetina?: boolean;
  className?: string;
}

const ProductCardMobileComponent: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  description,
  ingredients,
  isPizza,
  count,
  loading = false,
  onAdd,
  onQuantityChange,
  inCart,
  className,
  isRetina,
}) => {
  return (
    <div className={cn('h-full flex gap-2 py-4', className)}>
      <Link href={`/product/${id}`} className="shrink-0">
        <div className="w-[130px] h-[130px] overflow-hidden">
          <DynamicCldImage
            src={imageUrl}
            alt={name}
            width={isRetina ? 260 : 130}
            height={isRetina ? 260 : 130}
            loadMode="lazy"
            fallbackImage={true}
            unoptimized
            className="w-[130px] h-[130px] object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-col flex-1 min-w-0">
        <Link href={`/product/${id}`}>
          <Title
            text={name}
            size="md"
            className="mb-1 font-bold text-[18px] leading-[18px]"
          />

          <p className="text-xs text-gray-600">
            {description}

            {ingredients?.map((i) => i.name).join(', ')}
          </p>
        </Link>
        <div className="flex justify-between items-center mt-auto pt-1">
          <span className="text-[18px]">
            от <span className="font-semibold">{price} ₴</span>
          </span>

          <ProductCardActions
            id={id}
            inCart={inCart}
            count={count}
            isPizza={isPizza}
            loading={loading}
            onAdd={onAdd}
            onQuantityChange={onQuantityChange}
            isMobile
          />
        </div>
      </div>
    </div>
  );
};

export const ProductCardMobile = React.memo(ProductCardMobileComponent);
