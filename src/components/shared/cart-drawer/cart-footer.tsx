import { ArrowRight } from 'lucide-react';
import { SheetFooter } from '../../ui/sheet';
import { Button } from '../../ui';
import Link from 'next/link';
interface Props {
  isLoading?: boolean;
  totalAmount: number;
}
export const CartFooter: React.FC<Props> = ({ isLoading, totalAmount }) => {
  return (
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
          href={isLoading ? '#' : '/checkout'}
          onClick={(e) => {
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
  );
};
