import { cn } from '@/src/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('container mx-auto px-4', className)}>{children}</div>
  );
};
