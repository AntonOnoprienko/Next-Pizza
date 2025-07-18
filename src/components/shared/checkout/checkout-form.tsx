'use client';

import {
  CheckoutSummary,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutAddressForm,
} from '..';
import { useCart } from '@/src/hooks';
import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckoutFormData,
  checkoutFormSchema,
} from '@/src/constants/schemas/checkout-form-schema';
import { createOrder } from '@/src/app/api/actions';
import toast from 'react-hot-toast';
import { DynamicNotificationToast } from '../../dynamics';

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
  const [submitting, setSubmitting] = React.useState(false);

  const taxRate = 0.2;
  const DELIVERY_PRICE = 0;
  const taxAmount = +((totalAmount * taxRate) / (1 + taxRate)).toFixed(2);
  const basePrice = +(totalAmount - taxAmount).toFixed(2);
  const totalPrice = +(totalAmount + DELIVERY_PRICE).toFixed(2);
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      street: '',
      house: '',
      comment: '',
      email: '',
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    setSubmitting(true);

    await toast
      .promise(
        createOrder(data),
        {
          loading: (
            <DynamicNotificationToast
              isLoading
              success={false}
              error={false}
              notification="Оформляем заказ..."
            />
          ),
          success: (
            <DynamicNotificationToast
              isLoading={false}
              success
              error={false}
              notification="Заказ успешно оформлен! Перенаправляем..."
            />
          ),
          error: (error) => (
            <DynamicNotificationToast
              isLoading={false}
              success={false}
              error
              notification={error.message || 'Ошибка при создании заказа.'}
            />
          ),
        },
        {
          icon: null,
          position: 'top-center',
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
          },
        },
      )
      .then((url) => {
        if (url) {
          location.href = url;
        }
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  return (
    <FormProvider {...form}>
      <form
        aria-label="Форма оформления заказа"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-10">
          {/* Левая часть */}
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
          {/* Правая часть */}
          <div className="w-450px">
            <CheckoutSummary
              deliveryPrice={DELIVERY_PRICE}
              basePrice={basePrice}
              taxAmount={taxAmount}
              totalPrice={totalPrice}
              isActionsLoading={isActionsLoading}
              isCartLoading={isCartLoading}
              loading={submitting}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
