import { cn } from '@/src/lib/utils';
import React from 'react';
import { CountIconButton } from '.';
import { Spinner } from '../animations';

export interface CountButtonProps {
  value?: number;
  size?: 'sm' | 'lg';
  onClick?: (type: 'plus' | 'minus') => void;
  loading: boolean;
  className?: string;
}

export const CountButton: React.FC<CountButtonProps> = ({
  className,
  onClick,
  value = 1,
  size = 'sm',
  loading
}) => {
  return (
    <div className={cn('inline-flex items-center justify-between w-[100px]', className)}>
      <CountIconButton
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onClick?.('minus')
        }}
        disabled={value === 1 || loading}
        size={size}
        type="minus"
      />
      {loading ? (
        <Spinner size='sm' />
      ) : (
        <span className={cn('font-bold', size === 'sm' ? 'text-sm' : 'text-md')}>
          {value}
        </span>
      )}


      <CountIconButton disabled={loading} onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick?.('plus')
      }} size={size} type="plus" />
    </div>
  );
};