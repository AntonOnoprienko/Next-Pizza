'use client';

import React from 'react';
import { cn } from '@/src/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet';

import { useCartStore } from '@/src/store';
import { PizzaSize, PizzaType } from '@/src/constants/pizza';
import { CartDrawerHeader, CartDrawerItem, CartFooter, EmptyCart } from '.';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  const loadingById = useCartStore((state) => state.loadingById);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const removeCartItem = useCartStore((state) => state.removeCartItem);
  const isLoading = Object.values(loadingById).some(Boolean);

  const onClickCountButton = React.useCallback(
    (id: number, quantity: number, type: 'plus' | 'minus') => {
      const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

      updateItemQuantity(id, newQuantity);
    },
    [updateItemQuantity],
  );

  const cartItemList = items.map((item) => (
    <CartDrawerItem
      key={item.id}
      {...item}
      size={item.size as PizzaSize}
      type={item.type as PizzaType}
      className="mb-2"
      onClickCountButton={(type) =>
        onClickCountButton(item.id, item.quantity, type)
      }
      onClickRemove={() => removeCartItem(item.id)}
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
          {items.length > 0 && <CartDrawerHeader quantity={items.length} />}

          {items.length ? (
            <>
              <div className="-mx-6 mt-2 flex-1 overflow-auto">
                {cartItemList}
              </div>

              <CartFooter isLoading={isLoading} totalAmount={totalAmount} />
            </>
          ) : (
            <EmptyCart />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
