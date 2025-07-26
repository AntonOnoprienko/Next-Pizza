'use client';

import React from 'react';
import { Container, HeaderMobileMenu } from '../../shared';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import { ArrowLeft } from 'lucide-react';
import router from 'next/router';

type Props = {
  className?: string;
};

export const HeaderCheckoutMobile: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('border-b sticky bg-white top-0 z-50', className)}>
      <Container className="flex items-center justify-between py-2">
        <div className="flex gap-2">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <ArrowLeft size={20} />
          </button>
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
        </div>
        <HeaderMobileMenu />
      </Container>
    </header>
  );
};
