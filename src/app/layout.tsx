import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "NEXT PiZZa | Главная",
  description: "The best of the best Pizza shop!",
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={nunito.variable}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
