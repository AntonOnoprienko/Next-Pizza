import { PizzaSize, PizzaType } from '@/src/constants/pizza';
import {
  CheckoutCartItem,
  CheckoutCartItemMobile,
  CheckoutItemSkeleton,
  WhiteBlock,
} from '..';
import { CartStateItem } from '@/src/store';
import { cn } from '@/src/lib/utils';
interface Props {
  items: CartStateItem[];
  isCartLoading: boolean;
  loadingById: Record<number, boolean>;
  isActionsLoading: boolean;
  countHandlers: Record<number, (type: 'plus' | 'minus') => void>;
  removeHandlers: Record<number, () => void>;
  isMobile?: boolean;
  className?: string;
}
export const CheckoutCart: React.FC<Props> = ({
  items,
  isCartLoading,
  loadingById,
  countHandlers,
  removeHandlers,
  isMobile,
  className,
}) => {
  const cartItemList = items.map((item) =>
    isMobile ? (
      <CheckoutCartItemMobile
        key={item.id}
        {...item}
        size={item.size as PizzaSize}
        type={item.type as PizzaType}
        className="mb-2"
        onClickCountButton={countHandlers[item.id]}
        onClickRemove={() => {
          if (loadingById[item.id]) return;
          removeHandlers[item.id]();
        }}
        loading={loadingById[item.id] ?? false}
      />
    ) : (
      <CheckoutCartItem
        key={item.id}
        {...item}
        size={item.size as PizzaSize}
        type={item.type as PizzaType}
        className="mb-2"
        onClickCountButton={countHandlers[item.id]}
        onClickRemove={() => {
          if (loadingById[item.id]) return;
          removeHandlers[item.id]();
        }}
        loading={loadingById[item.id] ?? false}
      />
    ),
  );
  return (
    <WhiteBlock title="1. Корзина" className={cn(className)}>
      <div className="flex flex-col gap-5">
        {isCartLoading ? (
          <>
            <CheckoutItemSkeleton />
            <CheckoutItemSkeleton />
            <CheckoutItemSkeleton />
          </>
        ) : (
          cartItemList
        )}
      </div>
    </WhiteBlock>
  );
};
