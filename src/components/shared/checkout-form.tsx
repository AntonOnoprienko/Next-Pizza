import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import {
  CheckoutCartItem,
  CheckoutItemDetails,
  Container,
  Title,
  WhiteBlock,
} from '.';
import { Button, Input, Skeleton, Textarea } from '../ui';
import { cn } from '@/src/lib/utils';

export const CheckoutForm = () => {
  const loading = false;
  const totalPrice = 125;
  const totalAmount = 412;
  const vatPrice = 50;
  const DELIVERY_PRICE = 300;

  return (
    <Container className="mt-10">
      <Title
        size="lg"
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <div className="flex gap-10">
        {/* Левая часть*/}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Корзина">
            <CheckoutCartItem
              loading={false}
              id={1}
              imageUrl={'products/wkxhn2pflsed8zpzyezi'}
              name={'Пицца'}
              price={200}
              quantity={5}
              excludedIngredients={[
                { name: 'Сыр' },
                { name: 'Сыр' },
                { name: 'Сыр' },
              ]}
              extraIngredients={[
                { name: 'Помидор', price: 50 },
                { name: 'Помидор', price: 50 },
                { name: 'Помидор', price: 50 },
                { name: 'Помидор', price: 50 },
                { name: 'Помидор', price: 50 },
                { name: 'Помидор', price: 50 },
                { name: 'Помидор', price: 50 },
                { name: 'Помидор', price: 50 },
              ]}
              size={20}
              type={1}
            />
          </WhiteBlock>
          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Фамилия"
              />
              <Input name="email" className="text-base" placeholder="E-Mail" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input
                name="address"
                className="text-base"
                placeholder="Адресс"
              />
              <Textarea
                rows={5}
                className="text-base"
                placeholder="Комментарии к заказу"
              />
            </div>
          </WhiteBlock>
        </div>
        {/*Правая часть*/}
        <div className="w-[450px]">
          <WhiteBlock className={cn('p-6 sticky top-4')}>
            <div className="flex flex-col gap-1">
              <span className="text-xl">Итого:</span>
              {loading ? (
                <Skeleton className="h-11 w-48" />
              ) : (
                <span className="h-11 text-[34px] font-extrabold">
                  {totalPrice} ₴
                </span>
              )}
            </div>

            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Package size={18} className="mr-2 text-gray-400" />
                  Стоимость корзины:
                </div>
              }
              value={
                loading ? (
                  <Skeleton className="h-6 w-16 rounded-[6px]" />
                ) : (
                  `${totalAmount} ₴`
                )
              }
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Percent size={18} className="mr-2 text-gray-400" />
                  Налоги:
                </div>
              }
              value={
                loading ? (
                  <Skeleton className="h-6 w-16 rounded-[6px]" />
                ) : (
                  `${vatPrice} ₴`
                )
              }
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Truck size={18} className="mr-2 text-gray-400" />
                  Доставка:
                </div>
              }
              value={
                loading ? (
                  <Skeleton className="h-6 w-16 rounded-[6px]" />
                ) : (
                  `${DELIVERY_PRICE} ₴`
                )
              }
            />

            <Button
              loading={loading}
              type="submit"
              className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
              Перейти к оплате
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
};
