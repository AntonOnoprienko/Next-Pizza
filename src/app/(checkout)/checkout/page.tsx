import { CheckoutForm, Container, Title } from '@/src/components/shared';

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
