import "./globals.css";
import { Nunito } from "next/font/google";
import dynamic from "next/dynamic";

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["500", "600", "700", "800", "900"],
});

const CartLoader = dynamic(() => import('@/src/components/shared/').then(mod => mod.CartLoader), {
  ssr: false,
  loading: () => null
});

const DynamicToaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), {
  ssr: false,
  loading: () => null, 
});

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={nunito.variable}>
        <CartLoader />
        {children}
        <DynamicToaster />
      </body>
    </html>
  );
};

export default RootLayout;
