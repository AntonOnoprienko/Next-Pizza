import type { Metadata } from 'next';
import { Header } from '@/src/components/shared';

interface HomeLayoutProps {
  readonly children: React.ReactNode;
  readonly modal: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
  description:
    'Лучшая пицца в городе — заказывай онлайн в Next Pizza. Вкусно, быстро, удобно!',
  keywords: [
    'Next Pizza',
    'пиццерия',
    'пицца онлайн',
    'доставка пиццы',
    'пицца Харьков',
    'меню пиццы',
  ],
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'google-site-verification': 'zeq8yCb9T23l8MrGohHJKQXFMOAvCc940v2satzTlC8',
  },
  openGraph: {
    title: 'Next Pizza — Лучшая пицца в городе',
    description: 'Выбирай и заказывай пиццу онлайн. Вкусно, быстро, удобно!',
    url: 'https://next-pizza.up.railway.app',
    siteName: 'Next Pizza',
    images: [
      {
        url: 'https://next-pizza.up.railway.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Next Pizza — Лучшая пицца в городе',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const HomeLayout = ({ children, modal }: HomeLayoutProps) => {
  return (
    <main className="min-h-screen">
      <Header className="p-4" />
      {children}
      {modal}
    </main>
  );
};

export default HomeLayout;
