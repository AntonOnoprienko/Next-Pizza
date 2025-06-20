'use client'

import React from 'react';
import { cn } from '@/src/lib/utils';
import { Dialog, DialogContent, DialogTitle } from '@/src/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { CartItemToast, ChoosePizzaForm, ChooseProductForm } from '../.';
import { ProductWithRelations } from '@/src/@types/prisma';
import { useCartStore } from '@/src/store';
import { CreateCartItemValues } from '@/src/services/dto/cart.dto';
import toast from 'react-hot-toast';


type Props = {
  className?: string;
  product: ProductWithRelations;
};

export interface CartItemForToast extends CreateCartItemValues {
  name: string;
  imageUrl: string;
  price: number;
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const isPizza = Boolean(product.items[0].pizzaType)
  const addCartItem = useCartStore(state => state.addCartItem);
  const loading = useCartStore(state => state.loading);

  const handleAddCartItem = async (cartItem: CartItemForToast) => {
    const values = {
    productItemId: cartItem.productItemId,
    excludedIngredients: cartItem.excludedIngredients,
    extraIngredients: cartItem.extraIngredients,
  };
  toast.promise(
    addCartItem(values),
    {
      loading: <CartItemToast item={cartItem} isLoading={true} success={false} />,
      success: <CartItemToast item={cartItem} isLoading={false} success={true} />,
      error: 'Ошибка при добавлении товара',
    },
    {loading: { icon: null },
    success: { icon: null },
    error: { icon: null },
    style: {
      boxShadow: 'none',
      border: 'none',
      padding: 0,
      background: 'transparent'
    }}
  );
};


  return (

    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden',
          className)} aria-describedby={undefined}>

        <DialogTitle hidden={true}>Выбор продукта</DialogTitle>

        {isPizza ?

          (<ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
            ingredients={product.ingredients}
            description={product.description}
            onSubmit={handleAddCartItem}
            loading={loading}
          />)
          :
          (<ChooseProductForm
            description={product.description}
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
            ingredients={product.ingredients}
            onSubmit={handleAddCartItem}
            loading={loading}

          />)}
      </DialogContent>
    </Dialog>

  );
};
