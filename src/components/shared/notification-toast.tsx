'use client';

import React from 'react';
import { cn } from '@/src/lib/utils';
import { AnimatedError, AnimatedSuccessCircle, Spinner } from '../animations';

type Props = {
  notification: string;
  isLoading: boolean;
  success: boolean;
  error?: boolean;
  className?: string;
};

export const NotificationToast: React.FC<Props> = ({
  notification,
  isLoading,
  success,
  error,
  className,
}) => {
  const textColor = cn({
    'text-gray-900 dark:text-white': isLoading,
    'text-green-600 dark:text-green-400': success,
    'text-rose-600 dark:text-rose-400': error,
  });

  const containerStyle = cn(
    'px-6 py-4 rounded-xl shadow-md border flex items-center gap-4',
    className,
    {
      'bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800': !error,
      'bg-rose-50 border-rose-300 dark:bg-rose-900 dark:border-rose-700': error,
    },
  );

  return (
    <div aria-live="polite" className={containerStyle}>
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
        {isLoading ? (
          <Spinner />
        ) : success ? (
          <AnimatedSuccessCircle />
        ) : error ? (
          <AnimatedError />
        ) : null}
      </div>
      <div className="flex-1">
        <p className={cn('text-sm font-semibold text-center', textColor)}>
          {notification}
        </p>
      </div>
    </div>
  );
};
