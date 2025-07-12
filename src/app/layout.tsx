import './globals.css';
import { Nunito } from 'next/font/google';
import dynamic from 'next/dynamic';
import { ClientSessionProvider } from '../components/shared';
import NextTopLoader from 'nextjs-toploader';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['500', '600', '700', '800', '900'],
});

const CartLoader = dynamic(
  () =>
    import('@/src/components/shared/cart-loader').then((mod) => mod.CartLoader),
  {
    ssr: false,
    loading: () => null,
  },
);

const DynamicToaster = dynamic(
  () => import('react-hot-toast').then((mod) => mod.Toaster),
  {
    ssr: false,
    loading: () => null,
  },
);

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={nunito.variable}>
        <ClientSessionProvider>
          <CartLoader />
          <NextTopLoader />
          {children}
          <DynamicToaster />
        </ClientSessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
