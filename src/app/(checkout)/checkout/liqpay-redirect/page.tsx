import { Loader } from 'lucide-react';
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
  return <LiqPayRedirect />;
};

export default LiqPayRedirectPage;
