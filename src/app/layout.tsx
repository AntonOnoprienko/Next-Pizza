import { Nunito } from "next/font/google";
import toast, { Toaster } from 'react-hot-toast';
import "./globals.css";


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
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;