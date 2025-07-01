'use client';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import {
  CheckoutCartItem,
  CheckoutItemDetails,
  Container,
  Title,
  WhiteBlock,
} from '.';
import { Button, Input, Skeleton, Textarea } from '../ui';
import { cn } from '@/src/lib/utils';
import { useCart } from '@/src/hooks';
import { PizzaSize, PizzaType } from '@/src/constants/pizza';
import React from 'react';
import { CheckoutItemSkeleton } from './checkout/chekout-item-skeleton';

export const CheckoutForm = () => {
  const {
    items,
    loadingById,
    totalAmount,
    countHandlers,
    removeHandlers,
    isCartLoading,
    isActionsLoading,
  } = useCart();

  const vatPrice = 540;
  const DELIVERY_PRICE = 100;

  const cartItemList = items.map((item) => (
    <CheckoutCartItem
      key={item.id}
      {...item}
      size={item.size as PizzaSize}
      type={item.type as PizzaType}
      className="mb-2"
      onClickCountButton={countHandlers[item.id]}
      onClickRemove={() => {
        if (loadingById[item.id]) return;
        removeHandlers[item.id]();
      }}
      loading={loadingById[item.id] ?? false}
    />
  ));
  return (
    <Container className="mt-10">
      <Title
        size="lg"
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <div className="flex gap-10">
        {/* Левая часть*/}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Корзина">
            <div className="flex flex-col gap-5">
              {isCartLoading ? (
                <>
                  <CheckoutItemSkeleton />
                  <CheckoutItemSkeleton />
                  <CheckoutItemSkeleton />
                </>
              ) : (
                cartItemList
              )}
            </div>
          </WhiteBlock>
          <WhiteBlock title="2. Персональные данные" className="min-h-[210px]">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Фамилия"
              />
              <Input name="email" className="text-base" placeholder="E-Mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input
                name="address"
                className="text-base"
                placeholder="Адресс"
              />
              <Textarea
                rows={5}
                className="text-base"
                placeholder="Комментарии к заказу"
              />
            </div>
          </WhiteBlock>
        </div>
        {/*Правая часть*/}
        <div className="w-[450px]">
          <WhiteBlock className={cn('p-6 sticky top-4')}>
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого:</span>
              {isCartLoading ? (
                <Skeleton className="h-11 w-48" />
              ) : (
                <span className="h-11 text-[34px] font-extrabold">
                  {totalAmount} ₴
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
                  `${totalAmount} ₴`
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
                  `${vatPrice} ₴`
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
                  `${DELIVERY_PRICE} ₴`
                )
              }
            />

            <Button
              loading={isActionsLoading}
              type="submit"
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
              Перейти к оплате
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
      <CheckoutItemSkeleton />
    </Container>
  );
};
