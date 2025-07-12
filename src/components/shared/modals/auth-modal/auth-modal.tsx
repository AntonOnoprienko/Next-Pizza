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

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-[450px] bg-white p-6 sm:p-8 md:p-10 mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center ">Вход в аккаунт</DialogTitle>
          <DialogDescription>
            Введите свои данные или авторизуйтесь через GitHub/Google.
          </DialogDescription>
        </DialogHeader>
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
            variant="secondary"
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
      </DialogContent>
    </Dialog>
  );
};
