import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  LoginFormData,
  loginFormSchema,
} from '@/src/constants/schemas/login-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../../..';
import { Button } from '@/src/components/ui';
import {
  AnimatedError,
  AnimatedSuccessCheck,
} from '@/src/components/animations';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

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
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: <AnimatedSuccessCheck />,
      });
      onClose();
    } catch (error) {
      console.error('Error [Login]', error);
      toast.error('Не удалось войти в аккаунт', {
        icon: <AnimatedError />,
      });
    }
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
