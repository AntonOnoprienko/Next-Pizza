import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/shared";


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
  openGraph: {
    title: 'Next Pizza — Лучшая пицца в городе',
    description: 'Выбирай и заказывай пиццу онлайн. Вкусно, быстро, удобно!',
    url: 'https://next-pizza.up.railway.app',
    siteName: 'NextPizza',
    images: [
      {
        url: 'https://next-pizza.up.railway.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NextPizza — Лучшая пицца в городе',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={nunito.variable}>
        <Header className="p-4"></Header>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;