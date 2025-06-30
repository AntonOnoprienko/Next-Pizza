import { SheetDescription, SheetHeader, SheetTitle } from '../../ui/sheet';
interface Props {
  quantity: number;
}

export const CartDrawerHeader: React.FC<Props> = ({ quantity }) => {
  return (
    <SheetHeader className="mb-2">
      <SheetTitle aria-live="polite" aria-atomic="true">
        В корзине <span className="font-bold">{quantity + ' товар(а)'}</span>
      </SheetTitle>
      <SheetDescription>
        Проверьте состав и количество товаров перед оформлением заказа.
      </SheetDescription>
    </SheetHeader>
  );
};
