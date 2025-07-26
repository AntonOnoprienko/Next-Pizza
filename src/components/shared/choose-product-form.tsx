import React from 'react';
import { cn } from '@/src/lib/utils';
import { ResponsiveImage, Title } from '.';
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
  isMobile?: boolean;
  className?: string;
  description: string | null;
};

export const ChooseProductForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  loading,
  onSubmit,
  className,
  description,
  isMobile,
}) => {
  const textDetails = '';
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

  return isMobile ? (
    <div
      className={cn(
        'flex flex-col min-h-screen bg-[rgb(252,252,252)]',
        className,
      )}
    >
      <div className="flex flex-col py-7 px-5">
        <ResponsiveImage imageUrl={imageUrl} alt={name} />
        <Title text={name} size="md" className="font-bold mb-1 text-2xl" />
        <p className="text-gray-400">{textDetails}</p>
        <p>{description}</p>
      </div>
      <div className="mt-auto bg-[rgb(252,252,252)] border border-[rgb(252,252,252)]  py-3 px-4 z-50">
        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[48px] text-base rounded-[18px] w-full"
        >
          {loading
            ? 'Идёт загрузка'
            : `Добавить в корзину за ${firstItem.price} ₴`}
        </Button>
      </div>
    </div>
  ) : (
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
      <div className="flex flex-col w-[490px] h-full bg-[#F7F6F5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <p>{description}</p>
        <div className="sticky bottom-0 left-0 bg-[rgb(252,252,252)] border border-[rgb(252,252,252)]  py-3 px-4 z-50">
          <Button
            loading={loading}
            onClick={handleClickAdd}
            className="h-[48px] text-base rounded-[18px] w-full"
          >
            Добавить в корзину за {firstItem.price} ₴
          </Button>
        </div>
      </div>
    </div>
  );
};
