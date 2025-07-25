import React from 'react';
import { cn } from '@/src/lib/utils';
import { CircleCheck } from 'lucide-react';
import { DynamicCldImage } from '../dynamics';

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  isMobile: boolean;
  className?: string;
};

const IngredientItemComponent: React.FC<Props> = ({
  className,
  active,
  price,
  name,
  imageUrl,
  onClick,
  isMobile,
}) => {
  const imageSize = isMobile ? 100 : 110;
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center flex-col p-1 rounded-md text-center relative cursor-pointer shadow-md bg-white border border-white',
        isMobile ? 'w-[110px]' : 'w-32',
        { 'border-primary': active },
        className,
      )}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <DynamicCldImage
        src={imageUrl}
        alt={name}
        width={imageSize}
        height={imageSize}
        crop="fill"
        gravity="auto"
        quality="auto"
        format="auto"
        loadMode="lazy"
        fallbackImage
      />
      <div className="flex flex-col justify-between h-14">
        <span className="text-xs">{name}</span>
        <span className="font-bold">{price} ₴</span>
      </div>
    </div>
  );
};

export const IngredientItem = React.memo(IngredientItemComponent);
