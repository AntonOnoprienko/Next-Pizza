import React from 'react';
import { cn } from '@/src/lib/utils';
import { CircleX } from 'lucide-react';

type Props = {
  id: number;
  name: string;
  className?: string;
  callback: (id: number) => void
  isActive: boolean
};

export const ExcludeIngredient: React.FC<Props> = ({ className, id, name, callback, isActive }) => {
  return (
    <span
      onClick={() => callback(id)}
      className={cn(
        'flex items-center underline cursor-pointer gap-1', className,
        isActive && 'line-through text-muted-foreground'
      )}
    >{name}<CircleX size={14} />
    </span>
  );
};
