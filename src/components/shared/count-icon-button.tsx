import { Minus, Plus } from 'lucide-react';
import { CountButtonProps } from './count-button';
import { Button } from '../ui/button';
import { cn } from '@/src/lib/utils';

interface IconButtonProps {
  size?: CountButtonProps['size'];
  disabled?: boolean;
  type?: 'plus' | 'minus';
  onClick?: (e: any) => void;
}

export const CountIconButton: React.FC<IconButtonProps> = ({
  size = 'sm',
  disabled,
  type,
  onClick,
}) => {
  const isSmall = size === 'sm' || size === 'xs';
  return (
    <Button
      aria-label="Изменение количества"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      onTouchEnd={onClick}
      type="button"
      className={cn(
        'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
        isSmall
          ? 'w-[32px] h-[32px] rounded-[10px]'
          : 'w-[38px] h-[38px] rounded-md',
      )}
    >
      {type === 'plus' ? (
        <Plus className={isSmall ? 'h-4' : 'h-5'} />
      ) : (
        <Minus className={isSmall ? 'h-4' : 'h-5'} />
      )}
    </Button>
  );
};
