import { Container } from '@/src/components/shared/container';
import { Title } from '@/src/components/shared/title';
import { getCookiesInfo } from '@/src/lib/getCookiesInfo';
import { cn } from '@/src/lib/utils';
import dynamic from 'next/dynamic';

const CheckoutForm = dynamic(
  () =>
    import('@/src/components/shared/checkout/checkout-form').then(
      (mod) => mod.CheckoutForm,
    ),
  {
    ssr: false,
  },
);
const CheckoutPage = (): JSX.Element => {
  const { isMobile } = getCookiesInfo();
  return (
    <Container className={cn(isMobile ? 'mt-5' : 'mt-10', 'px-0')}>
      <Title
        size="lg"
        text="Оформление заказа"
        className={cn(
          'font-extrabold mb-8',
          isMobile ? 'text-2xl' : 'text-[36px]',
        )}
      />
      <CheckoutForm isMobile={isMobile} />
    </Container>
  );
};

export default CheckoutPage;
