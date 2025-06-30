import { cn } from '@/src/lib/utils';
import React from 'react';
import { CartButton, Container, SearchInput } from '../shared';
import Image from 'next/image';
import { Button } from '../ui';
import { UserRound } from 'lucide-react';
import { siteConfig } from '@/src/config/site';
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
            <Image src={'/logo.png'} alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">
                {siteConfig.ru.title}
              </h1>
              <p className="text-sm text-gray-600 leading-3">
                {siteConfig.ru.slogan}
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
          <Button variant={'outline'} className="flex items-center gap-1">
            <UserRound size={14} />
            Войти
          </Button>

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
