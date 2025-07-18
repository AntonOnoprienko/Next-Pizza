'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

import {
  LoginFormData,
  loginFormSchema,
} from '@/src/constants/schemas/login-form-schema';
import { FormInput } from '../../..';
import { Button } from '@/src/components/ui';
import { DynamicNotificationToast } from '@/src/components/dynamics';

type Props = {
  onClose: () => void;
};

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await toast
      .promise(
        signIn('credentials', {
          ...data,
          redirect: false,
        }),
        {
          loading: (
            <DynamicNotificationToast
              isLoading
              success={false}
              error={false}
              notification="Вход в аккаунт..."
            />
          ),
          success: (resp) => {
            if (resp?.ok) {
              onClose();
              return (
                <DynamicNotificationToast
                  isLoading={false}
                  success
                  error={false}
                  notification="Вы успешно вошли в аккаунт"
                />
              );
            } else {
              throw new Error();
            }
          },
          error: (error) => (
            <DynamicNotificationToast
              isLoading={false}
              success={false}
              error
              notification={error.message || 'Не удалось войти в аккаунт'}
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
      .catch((err) => {
        console.error('Ошибка авторизации:', err);
      });
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="email" label="Email" required type="email" />
        <FormInput name="password" label="Пароль" required type="password" />
        <Button
          loading={form.formState.isSubmitting}
          type="submit"
          className="h-12 text-base"
        >
          {form.formState.isSubmitting ? 'Вход...' : 'Войти'}
        </Button>
      </form>
    </FormProvider>
  );
};
