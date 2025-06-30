import Image from 'next/image';
import { Title } from '..';
import { SheetClose } from '../../ui/sheet';
import { Button } from '../../ui';
import { ArrowLeft } from 'lucide-react';
export const EmptyCart: React.FC = () => {
  return (
    <section
      aria-label="Пустая корзина"
      role="region"
      className="flex flex-col items-center justify-center w-72 mx-auto"
    >
      <Image
        src="/assets/images/empty-box.png"
        alt="Пустая корзина"
        width={120}
        height={120}
        priority
      />

      <Title
        size="sm"
        text="Корзина пустая"
        className="text-center font-bold my-2"
        aria-live="polite"
      />

      <p className="text-center text-neutral-500 mb-5">
        Добавьте хотя бы один товар, чтобы совершить заказ
      </p>

      <SheetClose asChild>
        <Button
          className="w-56 h-12 text-base"
          size="lg"
          aria-label="Закрыть корзину и вернуться назад"
        >
          <ArrowLeft className="w-5 mr-2" />
          Вернуться назад
        </Button>
      </SheetClose>
    </section>
  );
};
