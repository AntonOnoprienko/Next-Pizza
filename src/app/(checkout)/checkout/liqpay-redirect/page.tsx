import { Container, Title } from '@/src/components/shared';
import dynamic from 'next/dynamic';

const LiqPayRedirect = dynamic(
  () =>
    import('@/src/components/shared/liq-pay-redirect').then(
      (mod) => mod.LiqPayRedirect,
    ),
  {
    ssr: false,
  },
);

const LiqPayRedirectPage = () => {
  return (
    <Container className="mt-10">
      <Title
        size="lg"
        text="Перенаправляем на оплату через LiqPay..."
        className="font-extrabold mb-8 text-[36px]"
      />
      <LiqPayRedirect />;
    </Container>
  );
};

export default LiqPayRedirectPage;
