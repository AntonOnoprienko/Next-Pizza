import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';

type Props = {
  className?: string;
};

export const SortPopup: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer', className)}>
         <ArrowUpDown size={16} />
          <span className='font-bold'>Сортировка:</span>
          <span className='font-bold text-primary'>популярное</span>
    </div>
  );
};
