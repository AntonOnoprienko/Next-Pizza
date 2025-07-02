import { cn } from '@/src/lib/utils';
import React from 'react';
import { Skeleton } from '@/src/components/ui/skeleton';

interface Props {
  className?: string;
}

export const CheckoutItemSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center gap-5 flex-1">
        <Skeleton className="w-[50px] h-[50px] rounded-full" />
        <Skeleton className="w-48 h-5 rounded" />
      </div>
      <Skeleton className="w-10 h-5 rounded" />
      <div className="flex items-center gap-5 ml-20">
        <Skeleton className="w-24 h-8 rounded" />
        <Skeleton className="w-5 h-5 rounded" />
      </div>
    </div>
  );
};
