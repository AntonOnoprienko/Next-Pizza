import { ProductwithCategory, ProductWithRelations } from '@/src/@types/prisma';
import { CartItemForToast } from './cart-item-details/cart-item-details.types';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

type ChooseFormProps = {
  product: ProductWithRelations | ProductwithCategory;
  loadingById: Record<number, boolean>;
  isLCP?: boolean;
  onSubmit: (item: CartItemForToast) => void;
};

export const ChooseProductFormRenderer: React.FC<ChooseFormProps> = ({
  product,
  loadingById,
  isLCP,
  onSubmit,
}) => {
  const isPizza = Boolean(product.items[0].pizzaType);

  const commonProps = {
    description: product.description,
    imageUrl: product.imageUrl,
    name: product.name,
    items: product.items,
    ingredients: product.ingredients,
    onSubmit,
    loadingById,
    isLCP: isLCP,
  };

  return isPizza ? (
    <ChoosePizzaForm {...commonProps} />
  ) : (
    <ChooseProductForm {...commonProps} />
  );
};
