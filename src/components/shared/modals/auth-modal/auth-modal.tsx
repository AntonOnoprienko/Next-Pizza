import { Button } from '@/src/components/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { signIn } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login');
  const handleClose = () => {
    onClose();
  };

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-[450px] bg-white p-6 sm:p-8 md:p-10 mx-4 sm:mx-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div className="mr-2">
              <DialogTitle className="font-bold text-2xl">
                Вход в аккаунт
              </DialogTitle>
              <DialogDescription className="text-gray-400 text-base">
                Введите свои данные или авторизуйтесь через GitHub/Google.
              </DialogDescription>
            </div>
            <Image
              src="/assets/images/phone-icon.png"
              alt="phone-icon"
              width={60}
              height={60}
            />
          </div>
        </DialogHeader>
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <div className="w-full border-b border-gray-300"></div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <Image
              className="w-6 h-6"
              src="/assets/images/github.svg"
              alt="github-logo"
              width={24}
              height={24}
            />
            GitHub
          </Button>

          <Button
            disabled
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <Image
              className="w-6 h-6"
              src="/assets/images/google.svg"
              alt="google-logo"
              width={24}
              height={24}
            />
            Google
          </Button>
        </div>
        <Button
          variant="outline"
          type="button"
          className="h-12"
          onClick={onSwitchType}
        >
          {type !== 'login' ? 'Уже есть аккаунт? Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
