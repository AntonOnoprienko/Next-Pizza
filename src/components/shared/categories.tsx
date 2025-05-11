import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { siteConfig } from '@/config/site';


type Props = {
  className?: string;
};

const activeIndex = 0;

export const Categories: React.FC<Props> = ({ className }) => {
  
  return (
    <div className={cn('inline-flex gap-1 p-1 rounded-2xl bg-gray-50', className)}>
        {siteConfig.ru.categories.map((name:string, i:number) => (
        <Link
          key={name}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeIndex === i && 'bg-white shadow-md shadow-gray-200 text-primary',
          )}
          href="">
          {name}
        </Link>
        ))}
    </div>
  );
};
