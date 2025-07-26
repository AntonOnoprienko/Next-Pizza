import type { Metadata } from 'next';
import { Header, HeaderMobile } from '@/src/components/shared';
import { getCookiesInfo } from '@/src/lib/getCookiesInfo';

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
        url: 'https://next-pizza.up.railway.app/og-image.webp',
        width: 1024,
        height: 1024,
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
  const { isMobile } = getCookiesInfo();
  return (
    <main className="min-h-screen">
      {isMobile ? <HeaderMobile /> : <Header className="p-4" />}
      {children}
      {modal}
    </main>
  );
};

export default HomeLayout;
