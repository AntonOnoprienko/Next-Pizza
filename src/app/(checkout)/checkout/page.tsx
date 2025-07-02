import { Container, FullPageLoader, Title } from '@/src/components/shared';
import dynamic from 'next/dynamic';

const CheckoutForm = dynamic(
  () => import('@/src/components/shared').then((mod) => mod.CheckoutForm),
  {
    ssr: false,
    loading: () => <FullPageLoader />,
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
