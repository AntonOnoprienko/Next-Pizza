import { FullPageLoader } from '@/src/components/shared';
import dynamic from 'next/dynamic';

const CheckoutForm = dynamic(
  () => import('@/src/components/shared').then((mod) => mod.CheckoutForm),
  {
    ssr: false,
    loading: () => <FullPageLoader />,
  },
);

const CheckoutPage = (): JSX.Element => {
  return <CheckoutForm />;
};

export default CheckoutPage;
