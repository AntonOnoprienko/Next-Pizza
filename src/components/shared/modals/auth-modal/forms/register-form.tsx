'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { registerUser } from '@/src/app/api/actions';
import { FormInput } from '../../../form';
import { Button } from '@/src/components/ui';
import {
  RegisterFormData,
  registerFormSchema,
} from '@/src/constants/schemas/login-form-schema';
import { DynamicNotificationToast } from '@/src/components/dynamics';

interface Props {
  onClose?: () => void;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await toast.promise(
      registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
      {
        loading: (
          <DynamicNotificationToast
            isLoading
            success={false}
            error={false}
            notification="Идёт обработка данных..."
          />
        ),
        success: () => {
          onClose?.();
          return (
            <DynamicNotificationToast
              isLoading={false}
              success
              error={false}
              notification="Регистрация успешна. Подтвердите свою почту"
            />
          );
        },
        error: (error) => (
          <DynamicNotificationToast
            isLoading={false}
            success={false}
            error
            notification={error.message || 'Ошибка регистрации'}
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
    );
  };
  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
