import toast from 'react-hot-toast';

import { CartItemForToast } from '@/src/components/shared/cart-item-details/cart-item-details.types';
import { useCartStore } from '@/src/store';
import { DynamicCartItemToast } from '../components/dynamics';

export const useAddToCartToast = () => {
  const addToCart = useCartStore(state => state.addCartItem);

  return (item: CartItemForToast) => {
    const values = {
      productItemId: item.productItemId,
      excludedIngredients: item.excludedIngredients,
      extraIngredients: item.extraIngredients,
    };

    return toast.promise(
      addToCart(values),
      {
        loading: <DynamicCartItemToast item={item} isLoading={true} success={false} />,
        success: <DynamicCartItemToast item={item} isLoading={false} success={true} />,
        error: <DynamicCartItemToast item={item} isLoading={false} success={false} error={true} />,
      },
      {
        loading: { icon: null },
        success: { icon: null },
        error: { icon: null },
        style: {
          boxShadow: 'none',
          border: 'none',
          padding: 0,
          background: 'transparent',
        },
        position: 'top-right',
      }
    );
  };
};
