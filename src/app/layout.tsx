import "./globals.css";
import { Nunito } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import { CartLoader } from "@/src/components/shared";

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});


const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={nunito.variable}>
        <CartLoader />
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
