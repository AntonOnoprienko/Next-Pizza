'use client';
import {
  CheckoutSummary,
  Container,
  Title,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutAddressForm,
} from '..';
import { useCart } from '@/src/hooks';
import React from 'react';
import { CheckoutItemSkeleton } from './checkout-item-skeleton';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckoutFormSchema,
  checkoutFormSchema,
} from './schemas/checkout-form-schema';

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

  const taxRate = 0.2;
  const DELIVERY_PRICE = 80;
  const taxAmount = +((totalAmount * taxRate) / (1 + taxRate)).toFixed(2);
  const basePrice = +(totalAmount - taxAmount).toFixed(2);
  const totalPrice = +(totalAmount + DELIVERY_PRICE).toFixed(2);
  const form = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
      email: '',
    },
  });
  const onSubmit: SubmitHandler<CheckoutFormSchema> = (data) => {
    console.log(data);
  };

  return (
    <Container className="mt-10">
      <Title
        size="lg"
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <FormProvider {...form}>
        <form
          aria-label="Форма оформления заказа"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex gap-10">
            {/* Левая часть*/}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                isCartLoading={isCartLoading}
                loadingById={loadingById}
                isActionsLoading={isActionsLoading}
                countHandlers={countHandlers}
                removeHandlers={removeHandlers}
              />
              <CheckoutPersonalForm />
              <CheckoutAddressForm />
            </div>
            {/*Правая часть*/}
            <div className="w-450px">
              <CheckoutSummary
                deliveryPrice={DELIVERY_PRICE}
                basePrice={basePrice}
                taxAmount={taxAmount}
                totalPrice={totalPrice}
                isActionsLoading={isActionsLoading}
                isCartLoading={isCartLoading}
              />
            </div>
          </div>
        </form>
      </FormProvider>
      <CheckoutItemSkeleton />
    </Container>
  );
};
