'use client';

import React from 'react';
import { Container, HeaderMobileMenu, SearchInput } from '../../shared';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import { LayoutGrid, Search } from 'lucide-react';

type Props = {
  className?: string;
};

export const HeaderMobile: React.FC<Props> = ({ className }) => {
  const [showSearch, setShowSearch] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus();
    }
  }, [showSearch]);

  return (
    <header className={cn('border-b sticky bg-white top-0 z-50', className)}>
      <Container className="flex items-center justify-between py-2">
        <div className="flex gap-2">
          <button className="p-2 rounded-md hover:bg-gray-100 transition">
            <LayoutGrid size={20} />
          </button>
          {!showSearch && (
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
          )}
        </div>
        {showSearch && (
          <SearchInput
            onClose={() => setShowSearch(false)}
            isMobile
            inputRef={inputRef}
          />
        )}
        <div className="flex">
          {!showSearch && (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              <Search size={20} />
            </button>
          )}
          <HeaderMobileMenu />
        </div>
      </Container>
    </header>
  );
};
