'use client';

import React from 'react';
import { Container, HeaderMobileMenu } from '../../shared';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

type Props = {
  className?: string;
};

export const HeaderMobile: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('border-b sticky bg-white top-0 z-50', className)}>
      <Container className="flex items-center justify-between py-2">
        <Link href="/">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="logo"
              width={30}
              height={30}
              priority
              className="w-[30px] h-[30px]"
            />
            <div className="text-sm">
              <h1 className="text-lg font-black uppercase leading-5">
                Next Pizza
              </h1>
              <p className="text-gray-600 leading-4 text-xs">
                Вкуснее чем в буфете
              </p>
            </div>
          </div>
        </Link>
        <HeaderMobileMenu />
      </Container>
    </header>
  );
};
