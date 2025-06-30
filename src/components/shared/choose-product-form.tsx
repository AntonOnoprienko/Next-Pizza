import React from 'react';
import { cn } from '@/src/lib/utils';
import { Title } from '.';
import { Button } from '../ui';
import { Ingredient, ProductItem } from '@prisma/client';
import { CartItemForToast } from './cart-item-details/cart-item-details.types';
import { DynamicCldImage } from '../dynamics';

type Props = {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (cartItem: CartItemForToast) => void;
  className?: string;
  description: string | null;
};

export const ChooseProductForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
  description,
}) => {
  const textDetails = '30см , традиционное тесто 30';
  const firstItem = items[0];

  const handleClickAdd = () => {
    const cartItem = {
      productItemId: firstItem.id,
      excludedIngredients: [],
      extraIngredients: [],
      name,
      imageUrl: imageUrl || './fallback.svg',
      price: firstItem.price,
    };

    onSubmit(cartItem);
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <DynamicCldImage
          src={imageUrl}
          alt={name}
          width={350}
          height={350}
          className="relative left-2 top-2 transition-all z-10 duration-300"
          crop="fill"
          gravity="auto"
          quality="auto"
          format="auto"
          fallbackImage
        />
      </div>
      <div className="w-[490px] bg-[#F7F6F5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <p>{description}</p>
        <Button
          disabled={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          {loading
            ? 'Идёт загрузка'
            : `Добавить в корзину за ${firstItem.price} ₴`}
        </Button>
      </div>
    </div>
  );
};
