'use client';

import React from 'react';
import { cn } from '@/src/lib/utils';

export const NotificationToastSkeleton: React.FC = () => {
  return (
    <div
      className={cn(
        'w-full min-w-[300px] max-w-sm rounded-xl shadow-md border flex items-center gap-4 p-4 animate-pulse',
        'bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800',
      )}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-300 dark:bg-zinc-700" />
      <div className="flex-1">
        <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4" />
      </div>
    </div>
  );
};
