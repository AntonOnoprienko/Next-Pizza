'use client';

import React from 'react';
import { cn } from '@/src/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet';
import { PizzaSize, PizzaType } from '@/src/constants/pizza';
import { CartDrawerHeader, CartDrawerItem, CartFooter, EmptyCart } from '.';
import { useCart } from '@/src/hooks';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    items,
    loadingById,
    totalAmount,
    countHandlers,
    removeHandlers,
    isActionsLoading,
  } = useCart();
  const cartItemList = items.map((item) => (
    <CartDrawerItem
      key={item.id}
      {...item}
      size={item.size as PizzaSize}
      type={item.type as PizzaType}
      className="mb-2"
      onClickCountButton={countHandlers[item.id]}
      onClickRemove={removeHandlers[item.id]}
      loading={loadingById[item.id] ?? false}
    />
  ));

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div
          className={cn(
            'flex flex-col h-full',
            items.length === 0 && 'justify-center',
          )}
        >
          <CartDrawerHeader quantity={items.length} />

          {items.length ? (
            <>
              <div className="-mx-6 mt-2 flex-1 overflow-auto">
                {cartItemList}
              </div>

              <CartFooter
                isLoading={isActionsLoading}
                totalAmount={totalAmount}
              />
            </>
          ) : (
            <EmptyCart />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
