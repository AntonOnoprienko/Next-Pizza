'use client'

import React from 'react';
import { cn } from '@/src/lib/utils';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from '.';
import { useCartStore } from '@/src/store';
import { Spinner } from '../animations';

type Props = {
    className?: string;
};

export const CartButton: React.FC<Props> = ({ className }) => {
    const { totalAmount, items, loading } = useCartStore(state => state)
    return (
        <CartDrawer>
            <Button className={cn('group relative', { 'w-[105px]': loading }, className,)}>
                {loading ? <Spinner strokeColor='#ffff' size='sm' /> : (<>
                    <span className="font-bold">{totalAmount || 0} ₴</span>
                    <span className="h-full w-[1px] bg-white/30 mx-3" />
                    <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                        <ShoppingCart size={16} className="relative" strokeWidth={2} />
                        <span className="font-bold">{items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0}
                        </span>
                    </div>
                </>)}

                <ArrowRight
                    size={20}
                    className=" absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                />
            </Button>
        </CartDrawer>

    );
};
