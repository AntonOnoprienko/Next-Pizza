import { cn } from '@/src/lib/utils';
import React from 'react';
import { CountIconButton } from '.';
import dynamic from 'next/dynamic';

export interface CountButtonProps {
  value?: number;
  size?: 'sm' | 'lg';
  onClick?: (type: 'plus' | 'minus') => void;
  loading: boolean;
  allowZero?: boolean;
  className?: string;
}


const Spinner = dynamic(() => import('../animations/').then(mod => mod.Spinner), { ssr: false })

export const CountButton: React.FC<CountButtonProps> = ({
  className,
  onClick,
  value = 1,
  size = 'sm',
  loading,
  allowZero
}) => {
  return (
    <div className={cn('inline-flex items-center justify-between w-[100px]', className)}>
      <CountIconButton
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onClick?.('minus')
        }}
          disabled={(!allowZero && value === 1) || loading}
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