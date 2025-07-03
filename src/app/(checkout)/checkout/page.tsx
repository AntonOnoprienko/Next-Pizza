import { Container } from '@/src/components/shared/container';
import { Title } from '@/src/components/shared/title';
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
  return (
    <Container className="mt-10">
      <Title
        size="lg"
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <CheckoutForm />
    </Container>
  );
};

export default CheckoutPage;
