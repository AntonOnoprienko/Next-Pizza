'use client'

import React from 'react';
import { cn } from '@/src/lib/utils';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription
} from '@/src/components/ui/sheet';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CartDrawerItem } from './cart-drawer-item';
import { Ingredient } from '@prisma/client';

const selectedIngredients: Ingredient[] = [
    {
        id: 1,
        name: 'Моцарелла',
        price: 25,
        imageUrl: '/images/ingredients/mozzarella.png',
        createdAt: new Date(),
        updatedAt: new Date(),

    },
    {
        id: 2,
        name: 'Пепперони',
        price: 30,
        imageUrl: '/images/ingredients/pepperoni.png',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        name: 'Оливки',
        price: 15,
        imageUrl: '/images/ingredients/olives.png',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const excludedIngredients: Ingredient[] = [
    {
        id: 4,
        name: 'Лук',
        price: 10,
        imageUrl: '/images/ingredients/onion.png',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 5,
        name: 'Перец',
        price: 12,
        imageUrl: '/images/ingredients/pepper.png',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 6,
        name: 'Шампиньоны',
        price: 18,
        imageUrl: '/images/ingredients/mushrooms.png',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];


export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {

// const adaptedItem = {
//   id: cartItem.id,
//   quantity: cartItem.quantity,
//   price: cartItem.productItem.price,
//   size: cartItem.productItem.size,
//   type: cartItem.productItem.pizzaType,
//   imageUrl: cartItem.productItem.imageUrl || cartItem.productItem.product.imageUrl,
//   name: cartItem.productItem.product.name,
//   excludedIngredients: cartItem.ingredients,
//   extraIngredients: cartItem.productItem.extraIngredients.map(e => e.ingredient)
// }

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <SheetHeader className="mb-2">
                    <SheetTitle>
                        В корзине <span className="font-bold">3 товара</span>
                    </SheetTitle>
                    <SheetDescription>
                        Проверьте состав и количество товаров перед оформлением заказа.
                    </SheetDescription>
                </SheetHeader>

                <div className="-mx-6 mt-2 flex-1 overflow-auto">
                    <div className="mb-2">
                        <CartDrawerItem
                            id={1}
                            imageUrl={'pizza/kt55pnu34dwxvzpqqvcq'}
                            name={'Пеперони фреш'}
                            price={440} quantity={1}
                            size={30}
                            type={1}
                            excludedIngredients={selectedIngredients} extraIngredients={excludedIngredients} />

                    </div>
                    <div className="mb-2">
                        <CartDrawerItem
                            id={1}
                            imageUrl={'pizza/kt55pnu34dwxvzpqqvcq'}
                            name={'Пеперони фреш'}
                            price={440} quantity={1}
                            size={30}
                            type={1}
                            excludedIngredients={selectedIngredients} extraIngredients={excludedIngredients} />

                    </div>
                    <div className="mb-2">
                        <CartDrawerItem
                            id={1}
                            imageUrl={'pizza/kt55pnu34dwxvzpqqvcq'}
                            name={'Пеперони фреш'}
                            price={440} quantity={1}
                            size={30}
                            type={1}
                            excludedIngredients={selectedIngredients} extraIngredients={excludedIngredients} />

                    </div>




                    <div className="mb-2">
                        <CartDrawerItem
                            id={1}
                            imageUrl={'pizza/kt55pnu34dwxvzpqqvcq'}
                            name={'Пеперони фреш'}
                            price={440} quantity={1}
                            size={30}
                            type={1}
                            excludedIngredients={selectedIngredients} extraIngredients={excludedIngredients} />

                    </div>
                </div>


                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Итого
                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                            </span>
                            <span className="font-bold text-lg">500 ₴</span>
                        </div>

                        <Link href="/checkout">
                            <Button
                                type="submit"
                                className="w-full h-12 text-base">
                                Оформить заказ
                                <ArrowRight className="w-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>

        </Sheet>
    );
};
