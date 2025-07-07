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
  CheckoutFormSchema,
  checkoutFormSchema,
} from '../../../constants/schemas/checkout-form-schema';
import { createOrder } from '@/src/app/api/actions';
import toast from 'react-hot-toast';
import { AnimatedError, AnimatedSuccessCheck } from '../../animations';

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
      city: '',
      street: '',
      house: '',
      comment: '',
      email: '',
    },
  });
  const onSubmit: SubmitHandler<CheckoutFormSchema> = async (data) => {
    setSubmitting(true);
    try {
      const url = await createOrder(data);
      toast.success('Заказ успешно оформлен переходите на оплату...', {
        icon: <AnimatedSuccessCheck />,
      });
      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.error('Ошибка при создании заказа:', err);
      toast.error('Не удалось создать заказ...', {
        icon: <AnimatedError />,
      });
      setSubmitting(false);
    }
  };

  return (
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
              loading={submitting}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
