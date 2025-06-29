'use client'

import React from 'react';
import { cn } from '@/src/lib/utils';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription,
    SheetClose
} from '@/src/components/ui/sheet';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CartDrawerItem } from './cart-drawer-item';
import { useCartStore } from '@/src/store';
import { PizzaSize, PizzaType } from '@/src/constants/pizza';
import { Title } from '.';
import Image from 'next/image';


export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {

    const totalAmount = useCartStore(state => state.totalAmount);
    const items = useCartStore(state => state.items);
    const loadingById = useCartStore(state => state.loadingById);
    const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
    const removeCartItem = useCartStore(state => state.removeCartItem);
    const isLoading = Object.values(loadingById).some(Boolean);
    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <div className={cn('flex flex-col h-full', items.length === 0 && 'justify-center')}>
                    {items.length > 0 && <SheetHeader className="mb-2">
                        <SheetTitle aria-live="polite" aria-atomic="true">
                            В корзине <span className="font-bold">{items.length + " товар(а)"}</span>
                        </SheetTitle>
                        <SheetDescription>
                            Проверьте состав и количество товаров перед оформлением заказа.
                        </SheetDescription>
                    </SheetHeader>}

                    {items.length === 0 && (
                        <section
                            aria-label="Пустая корзина"
                            role="region"
                            className="flex flex-col items-center justify-center w-72 mx-auto"
                        >
                            <Image
                                src="/assets/images/empty-box.png"
                                alt="Пустая корзина"
                                width={120}
                                height={120}
                                priority
                            />

                            <Title
                                size="sm"
                                text="Корзина пустая"
                                className="text-center font-bold my-2"
                                aria-live="polite"
                            />

                            <p className="text-center text-neutral-500 mb-5">
                                Добавьте хотя бы один товар, чтобы совершить заказ
                            </p>

                            <SheetClose asChild>
                                <Button
                                    className="w-56 h-12 text-base"
                                    size="lg"
                                    aria-label="Закрыть корзину и вернуться назад"
                                >
                                    <ArrowLeft className="w-5 mr-2" />
                                    Вернуться назад
                                </Button>
                            </SheetClose>
                        </section>
                    )}


                    {items.length > 0 && (
                        <>
                            <div className="-mx-6 mt-2 flex-1 overflow-auto">
                                {items.map(item => (
                                    <CartDrawerItem
                                        key={item.id}
                                        id={item.id}
                                        imageUrl={item.imageUrl}
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        size={item.size as PizzaSize}
                                        type={item.type as PizzaType}
                                        excludedIngredients={item.excludedIngredients}
                                        extraIngredients={item.extraIngredients}
                                        className='mb-2'
                                        onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                                        onClickRemove={() => removeCartItem(item.id)}
                                        loading={loadingById[item.id] ?? false}
                                    />
                                ))}
                            </div>

                            <SheetFooter className="-mx-6 bg-white p-8">
                                <div className="w-full">
                                    <div className="flex mb-4">
                                        <span className="flex flex-1 text-lg text-neutral-500">
                                            Итого
                                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                        </span>
                                        <span className="font-bold text-lg">{totalAmount} ₴</span>
                                    </div>

                                    <Link
                                        href={isLoading ? "#" : "/checkout"}
                                        onClick={e => {
                                            if (isLoading) e.preventDefault();
                                        }}
                                    >
                                        <Button className="w-full h-12 text-base">
                                            Оформить заказ
                                            <ArrowRight className="w-5 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </SheetFooter>
                        </>
                    )}

                </div>
            </SheetContent>
        </Sheet >
    );
};
