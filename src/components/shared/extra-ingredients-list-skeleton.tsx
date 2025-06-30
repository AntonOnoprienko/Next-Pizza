import React from 'react';
import { Skeleton } from '@/src/components/ui/';
import { cn } from '@/src/lib/utils';

type Props = {
  className?: string;
};

export const ExtraIngredientsListSkeleton: React.FC<Props> = ({
  className,
}) => {
  const skeletonArray = Array.from({ length: 6 });

  return (
    <div
      className={cn(
        'bg-gray-50 px-5 py-3 rounded-md h-[390px] overflow-auto scrollbar mt-2',
        className,
      )}
    >
      <div className="grid grid-cols-3 gap-3 mt-2">
        {skeletonArray.map((_, index) => (
          <div
            key={index}
            className="flex items-center flex-col p-1 rounded-md w-32 text-center relative shadow-md bg-white border border-white animate-pulse"
          >
            <Skeleton className="w-[110px] h-[110px] rounded-md" />
            <div className="flex flex-col justify-between h-14 mt-2 w-full items-center space-y-1">
              <Skeleton className="w-20 h-3 rounded" />
              <Skeleton className="w-12 h-4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
