import { cn } from '@/src/lib/utils';
import React from 'react';
import { CountIconButton } from '.';
import dynamic from 'next/dynamic';

export interface CountButtonProps {
  value?: number;
  size?: 'xs' | 'sm' | 'lg';
  onClick?: (type: 'plus' | 'minus') => void;
  loading: boolean;
  allowZero?: boolean;
  isMobile?: boolean;
  className?: string;
}

const Spinner = dynamic(
  () => import('../animations/spinner').then((mod) => mod.Spinner),
  { ssr: false },
);

const heightMap: Record<NonNullable<CountButtonProps['size']>, string> = {
  xs: 'h-8',
  sm: 'h-9',
  lg: 'h-11',
};

export const CountButton: React.FC<CountButtonProps> = ({
  className,
  onClick,
  value = 1,
  size = 'sm',
  loading,
  allowZero,
  isMobile,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-between w-[100px]',
        heightMap[size],
        className,
      )}
    >
      <CountIconButton
        aria-label="Уменьшить количество"
        onClick={() => onClick?.('minus')}
        disabled={(!allowZero && value === 1) || loading}
        size={size}
        type="minus"
        isMobile={isMobile}
      />
      {loading ? (
        <Spinner size="sm" />
      ) : (
        <span
          className={cn('font-bold', size === 'sm' ? 'text-sm' : 'text-md')}
        >
          {value}
        </span>
      )}

      <CountIconButton
        aria-label="Увеличить количество"
        disabled={loading}
        onClick={() => onClick?.('plus')}
        size={size}
        type="plus"
        isMobile={isMobile}
      />
    </div>
  );
};
