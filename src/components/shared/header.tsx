import { cn } from '@/src/lib/utils';
import React from 'react';
import { CartButton, Container, LoginButton, SearchInput } from '../shared';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type Props = {
  hasCart?: boolean;
  hasSearch?: boolean;
  className?: string;
};

export const Header: React.FC<Props> = ({
  hasCart = true,
  hasSearch = true,
  className,
}) => {
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image
              src={'/logo.png'}
              alt="logo"
              width={35}
              height={35}
              priority={true}
              className="w-[35px] h-[35px]"
            />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-600 leading-3">
                Вкуснее чем в буфете
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <LoginButton />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
