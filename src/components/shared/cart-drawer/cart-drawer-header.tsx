import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/src/components/ui/sheet';

interface Props {
  quantity: number;
}

export const CartDrawerHeader: React.FC<Props> = ({ quantity }) => {
  const isEmpty = quantity === 0;

  return (
    <SheetHeader className="mb-2">
      {isEmpty ? (
        <>
          <SheetTitle className="sr-only">Корзина пуста</SheetTitle>
          <SheetDescription className="sr-only">
            В вашей корзине нет товаров
          </SheetDescription>
        </>
      ) : (
        <>
          <SheetTitle aria-live="polite" aria-atomic="true">
            В корзине <span className="font-bold">{quantity} товар(а)</span>
          </SheetTitle>
          <SheetDescription>
            Проверьте состав и количество товаров перед оформлением заказа.
          </SheetDescription>
        </>
      )}
    </SheetHeader>
  );
};
