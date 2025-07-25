import React from 'react';
import { cn } from '@/src/lib/utils';
import { ProductItemWithExtras } from '@/src/@types/prisma';
import { IngredientItem } from '.';

type Props = {
  item?: ProductItemWithExtras;
  className?: string;
  addIngredient: (id: number) => void;
  selectedIngredients: Set<number>;
  isMobile?: boolean;
};

export const IngredientsList: React.FC<Props> = ({
  item,
  addIngredient,
  selectedIngredients,
  isMobile = false,
  className,
}) => {
  const handlers = React.useMemo(() => {
    const map = new Map<number, () => void>();

    item?.extraIngredients.forEach(({ ingredient }) => {
      map.set(ingredient.id, () => addIngredient(ingredient.id));
    });

    return map;
  }, [item?.extraIngredients, addIngredient]);

  return (
    <div
      className={cn(
        'bg-gray-50 py-3 rounded-md h-[390px] overflow-auto scrollbar mt-2',
        !isMobile && 'px-5',
        className,
      )}
    >
      <div
        className={cn('grid grid-cols-3 mt-2', isMobile ? 'gap-1' : 'gap-3')}
      >
        {item &&
          item.extraIngredients.map(({ ingredient }) => (
            <IngredientItem
              key={ingredient.id}
              name={ingredient.name}
              imageUrl={ingredient.imageUrl}
              price={ingredient.price}
              onClick={handlers.get(ingredient.id)!}
              active={selectedIngredients.has(ingredient.id)}
              isMobile={isMobile}
            />
          ))}
      </div>
    </div>
  );
};
