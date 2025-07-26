'use client';

import React from 'react';
import { cn } from '@/src/lib/utils';
import { Search } from 'lucide-react';
import { useClickAway, useDebounce } from 'react-use';
import Link from 'next/link';
import { Api } from '@/src/services/api-client';
import { Product } from '@prisma/client';
import { DynamicCldImage } from '../dynamics';

type Props = {
  isMobile?: boolean;
  onClose?: () => void;
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
};

export const SearchInput: React.FC<Props> = ({
  isMobile,
  onClose,
  inputRef,
  className,
}) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [focused, setFocused] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<Product[]>([]);

  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
    onClose?.();
  });

  useDebounce(
    () => {
      const fetchData = async () => {
        if (!searchQuery.trim()) {
          setProducts([]);

          return;
        }
        try {
          const response = await Api.products.search(searchQuery);

          setProducts(response);
        } catch (e) {
          console.log(e);
        }
      };

      fetchData();
    },
    250,
    [searchQuery],
  );

  const onClickItem = React.useCallback(() => {
    setSearchQuery('');
    setFocused(false);
    setProducts([]);
  }, []);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/50 transition-opacity duration-200 z-30',
          focused
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      />

      <div
        ref={ref}
        className={cn(
          'flex flex-1 justify-between relative z-30',
          isMobile ? 'h-9 rounded-sm' : 'h-11 rounded-2xl',
          className,
        )}
      >
        {!isMobile && (
          <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        )}
        <input
          ref={inputRef}
          aria-label="Поиск по названию"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(
            'outline-none w-full bg-gray-100',
            isMobile
              ? 'h-9 text-sm pl-4 rounded-sm'
              : 'h-11 text-base pl-11 rounded-2xl',
          )}
          type="text"
          placeholder="Найти продукт..."
          onFocus={() => setFocused(true)}
        />
        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12',
            )}
          >
            {products.map((item) => (
              <Link
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                key={item.id}
                href={`/product/${item.id}`}
                onClick={onClickItem}
              >
                <DynamicCldImage
                  className="rounded-sm"
                  src={item.imageUrl}
                  alt={item.name}
                  width={32}
                  height={32}
                  quality="auto"
                  format="auto"
                  loadMode="lazy"
                  fallbackImage
                />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
