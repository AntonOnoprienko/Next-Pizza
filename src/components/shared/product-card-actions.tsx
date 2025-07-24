import React from 'react';
import { cn } from '@/src/lib/utils';
import { CountButton } from '.';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import Link from 'next/link';

type Props = {
  id: number;
  inCart: boolean;
  count?: number;
  isPizza: boolean;
  loading?: boolean;
  onAdd?: () => void;
  onQuantityChange?: (type: 'plus' | 'minus') => void;
  className?: string;
  isMobile?: boolean;
};

const ProductCardActionsComponent: React.FC<Props> = ({
  id,
  inCart,
  count,
  isPizza,
  loading = false,
  onAdd,
  onQuantityChange,
  isMobile = false,
  className,
}) => {
  return (
    <div className={cn(className)}>
      {inCart ? (
        <CountButton
          value={count}
          loading={loading}
          allowZero={true}
          onClick={onQuantityChange}
          size={isMobile ? 'xs' : 'sm'}
        />
      ) : isPizza ? (
        <Link href={`/product/${id}`}>
          <Button variant="secondary">Выбрать</Button>
        </Link>
      ) : (
        <Button
          className={cn(isMobile ? 'w-[125px] text-sm h-8' : 'w-[125px]')}
          loading={loading}
          disabledStyles="bg-[#FF5E00]"
          variant="secondary"
          onClick={() => {
            if (loading) return;
            onAdd?.();
          }}
        >
          <Plus size={isMobile ? 16 : 20} className="mr-1" />В корзину
        </Button>
      )}
    </div>
  );
};

export const ProductCardActions = React.memo(ProductCardActionsComponent);
