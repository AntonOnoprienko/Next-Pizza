import React from 'react';
import { cn } from '@/src/lib/utils';
import { CountButton } from '.';
import { Button } from '../ui';
import { Plus } from 'lucide-react';

type Props = {
    inCart: boolean;
    count?: number;
    isPizza: boolean;
    loading?: boolean;
    onAdd?: () => void;
    onQuantityChange?: (type: 'plus' | 'minus') => void;
    className?: string;
};

const ProductCardActionsComponent: React.FC<Props> = ({ inCart, count, isPizza, loading = false, onAdd, onQuantityChange, className }) => {
    return (
        <div className={cn(className)}>
            {inCart ? (
                <CountButton
                    value={count}
                    loading={loading}
                    allowZero={true}
                    onClick={onQuantityChange}
                    size="sm"
                    className="my-[5px]"
                />
            ) : isPizza ? (
                <Button >Выбрать</Button>
            ) : (
                <Button
                    className="w-[125px]"
                    loading={loading}
                    disabledStyles="bg-[#FF7518]"
                    
                    onClick={(e) => {
                        if (loading) return;
                        e.preventDefault();
                        e.stopPropagation();
                        onAdd?.();
                    }}
                >
                    <Plus size={20} className="mr-1" />
                    В корзину
                </Button>
            )}
        </div>
    );
};

export const ProductCardActions = React.memo(ProductCardActionsComponent)