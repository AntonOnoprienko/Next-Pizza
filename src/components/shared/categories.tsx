'use client'
import React from 'react';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
import { siteConfig } from '@/src/config/site';
import { useCategoryStore } from '@/src/store/category';


type Props = {
  className?: string;
};



export const Categories: React.FC<Props> = ({ className }) => {
  const activeCategory = useCategoryStore(state => state.activeId)

  return (
    <div className={cn('inline-flex gap-1 p-1 rounded-2xl bg-gray-50', className)}>
        {siteConfig.ru.categories.map(({name,id}) => (
        <Link
          key={name}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeCategory === id && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}
          href={`/#${name}`}>
          {name}
        </Link>
        ))}
    </div>
  );
};
