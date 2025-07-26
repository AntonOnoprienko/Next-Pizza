'use client';
import { CircleUser, UserRound } from 'lucide-react';
import { Button } from '../ui';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { AuthModal } from './modals';

export const LoginButton: React.FC = () => {
  const [isOpenAuth, setIsOpenAuth] = React.useState(false);
  const { data: session } = useSession();

  return (
    <div>
      <AuthModal open={isOpenAuth} onClose={() => setIsOpenAuth(false)} />
      {!session ? (
        <Button
          onClick={() => setIsOpenAuth(true)}
          variant="outline"
          className="flex items-center gap-1"
        >
          <UserRound size={14} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
