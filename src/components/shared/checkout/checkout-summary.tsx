import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { CheckoutItemDetails, WhiteBlock } from '..';
import { Button, Skeleton } from '../../ui';
import React from 'react';
import { cn } from '@/src/lib/utils';

interface Props {
  isCartLoading: boolean;
  isActionsLoading: boolean;
  deliveryPrice: number;
  totalPrice: number;
  basePrice: number;
  taxAmount: number;
  loading: boolean;
  isMobile?: boolean;
}

export const CheckoutSummary: React.FC<Props> = ({
  totalPrice,
  basePrice,
  taxAmount,
  deliveryPrice,
  isCartLoading,
  isActionsLoading,
  loading,
  isMobile,
}) => {
  return (
    <WhiteBlock className={cn(isMobile ? '' : 'p-6 sticky top-4')}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {isCartLoading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {totalPrice} ₴
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={
          isCartLoading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${basePrice} ₴`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />
            Налоги:
          </div>
        }
        value={
          isCartLoading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${taxAmount} ₴`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={
          isCartLoading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${deliveryPrice} ₴`
          )
        }
      />

      <Button
        loading={isActionsLoading || loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
