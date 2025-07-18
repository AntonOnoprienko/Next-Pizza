'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

import {
  RegisterFormData,
  registerFormSchema,
  UpdateUserData,
} from '@/src/constants/schemas/login-form-schema';
import { updateUserInfo } from '@/src/app/api/actions';

import { Container } from './container';
import { Title } from './title';
import { FormInput } from './form';
import { Button } from '../ui';
import { DynamicNotificationToast } from '../dynamics';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (formData: RegisterFormData) => {
    const userData: UpdateUserData = {
      email: formData.email,
      fullName: formData.fullName,
      password: formData.password,
    };

    await toast.promise(
      updateUserInfo(userData),
      {
        loading: (
          <DynamicNotificationToast
            isLoading
            success={false}
            error={false}
            notification="Сохраняем данные..."
          />
        ),
        success: (
          <DynamicNotificationToast
            isLoading={false}
            success
            error={false}
            notification="Данные успешно обновлены!"
          />
        ),
        error: (error) => (
          <DynamicNotificationToast
            isLoading={false}
            success={false}
            error
            notification={error.message || 'Ошибка при обновлении данных'}
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

  const onClickSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <Container className="my-10">
      <Title
        text={`Личные данные | #${data.id}`}
        size="md"
        className="font-bold"
      />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />
          <FormInput
            type="password"
            name="password"
            label="Новый пароль"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Повторите пароль"
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Выйти из профиля
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
