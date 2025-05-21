'use client'
import React from 'react';
import { cn } from '@/src/lib/utils';
import Link from 'next/link';
import { useCategoryStore } from '@/src/store/category';
import { Category } from '@prisma/client';


type Props = {
  className?: string;
  items: Category[];
};



export const Categories: React.FC<Props> = ({ className, items  }) => {
  const activeCategory = useCategoryStore(state => state.activeId)

  return (
    <div className={cn('inline-flex gap-1 p-1 rounded-2xl bg-gray-50', className)}>
      
        {items.map(({name,id}) => (
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
