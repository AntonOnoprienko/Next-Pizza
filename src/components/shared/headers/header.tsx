'use client';

import React from 'react';
import { CartButton, LoginButton, SearchInput } from '../../shared';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import { Container } from '../../shared';

type Props = {
  className?: string;
};

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="logo"
              width={35}
              height={35}
              priority
              className="w-[35px] h-[35px]"
            />
            <div className="text-base">
              <h1 className="text-2xl font-black uppercase leading-5">
                Next Pizza
              </h1>
              <p className="text-gray-600 leading-4">Вкуснее чем в буфете</p>
            </div>
          </div>
        </Link>

        <div className="flex-1 mx-10">
          <SearchInput />
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <LoginButton />
          <CartButton />
        </div>
      </Container>
    </header>
  );
};
