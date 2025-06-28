'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { CartItemForToast } from '../shared/cart-item-details/cart-item-details.types';
import { CartItemToastSkeleton } from '../shared/cart-item-details';


interface Props {
  item: CartItemForToast;
  isLoading: boolean;
  success: boolean;
  error?: boolean;
}

const DynamicCartItemToastComponent = dynamic(
  () => import('../shared/cart-item-details').then(mod => mod.CartItemToast),
  { ssr: false,
    loading: () => <CartItemToastSkeleton />,
   }
);


export const DynamicCartItemToast: React.FC<Props> = (props) => {
  return <DynamicCartItemToastComponent {...props} />;
};
