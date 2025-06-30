'use client';

import React from 'react';
import { cn } from '@/src/lib/utils';

export const CartItemToastSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'w-full min-w-[320px] max-w-sm rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800',
        'flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 animate-pulse',
        className,
      )}
    >
      <div className="flex-shrink-0 rounded-md overflow-hidden w-14 h-14">
        <img
          src="/fallback.svg"
          alt="loading fallback"
          width={56}
          height={56}
          className="w-[56px] h-[56px] object-cover bg-gray-200"
          aria-hidden="true"
        />
      </div>

      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-zinc-600 rounded w-1/2" />
        <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-1/3" />
      </div>

      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-300 dark:bg-zinc-700" />
    </div>
  );
};
