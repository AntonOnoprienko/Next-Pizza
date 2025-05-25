'use client'

import React from 'react';
import { cn } from '@/src/lib/utils';
import { Dialog, DialogContent } from '@/src/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm, ChooseProductForm } from '../.';
import { ProductWithRelations } from '@/src/@types/prisma';


type Props = {
  className?: string;
  product: ProductWithRelations;
};

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
const router = useRouter();
const isPizza = Boolean(product.items[0].pizzaType)

  return (
    
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
             {isPizza? (<ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} items={product.items} ingredients={product.ingredients}  />) :   (<ChooseProductForm imageUrl={product.imageUrl} name={product.name} items={product.items} ingredients={product.ingredients}   />) }
            </DialogContent>
        </Dialog>
   
  );
};
