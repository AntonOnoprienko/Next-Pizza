import type { Metadata } from "next";
import { Header } from "@/src/components/shared";

interface HomeLayoutProps {
  readonly children: React.ReactNode;
  readonly modal: React.ReactNode;
}

export const metadata: Metadata = {
  title: "NEXT PiZZa | Главная",
  description: "The best of the best Pizza shop!",
  openGraph: {
    title: "Next Pizza — Лучшая пицца в городе",
    description: "Выбирай и заказывай пиццу онлайн. Вкусно, быстро, удобно!",
    url: "https://next-pizza.up.railway.app",
    siteName: "NextPizza",
    images: [
      {
        url: "https://next-pizza.up.railway.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextPizza — Лучшая пицца в городе",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
};

const HomeLayout = ({ children, modal }: HomeLayoutProps) => {
  return (
      <main className="min-h-screen">
        <Header className="p-4" />
        {modal}
        {children}
        
      </main>
  );
};

export default HomeLayout;
