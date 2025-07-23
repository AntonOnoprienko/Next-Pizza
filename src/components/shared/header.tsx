import { cn } from '@/src/lib/utils';
import React from 'react';
import {
  CartButton,
  Container,
  HeaderMobileMenu,
  LoginButton,
  SearchInput,
} from '../shared';
import Image from 'next/image';
import Link from 'next/link';

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
              className="w-[30px] h-[30px] md:w-[35px] md:h-[35px]"
            />
            <div className="text-sm md:text-base">
              <h1 className="text-lg md:text-2xl font-black uppercase leading-5">
                Next Pizza
              </h1>
              <p className="text-gray-600 leading-4">Вкуснее чем в буфете</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="w-full order-3 md:order-none md:flex-1 md:mx-10 hidden md:block">
            <SearchInput />
          </div>
        )}

        <div className=" items-center gap-3 flex-shrink-0 hidden md:flex ">
          <LoginButton />
          {hasCart && <CartButton />}
        </div>
        <div className="md:hidden">
          <HeaderMobileMenu hasCart={hasCart} hasSearch={hasSearch} />
        </div>
      </Container>
    </header>
  );
};
