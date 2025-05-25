import React from 'react';
import { cn } from '@/src/lib/utils';

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export const Ingredient: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('', className)}></div>
  );
};
