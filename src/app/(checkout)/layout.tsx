import { Container, Header } from '@/src/components/shared';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Next Pizza | Оформление заказа',
  description:
    'Завершите оформление заказа в Next Pizza. Удобная и быстрая корзина для ваших любимых пицц и напитков.',
  keywords: [
    'Next Pizza',
    'корзина',
    'оформление заказа',
    'доставка пиццы',
    'заказ пиццы онлайн',
  ],
  openGraph: {
    title: 'Next Pizza | Оформление заказа',
    description: 'Оформите заказ в Next Pizza — быстро, удобно и вкусно!',
    url: 'https://next-pizza.up.railway.app',
    type: 'website',
    siteName: 'Next Pizza',
    images: [
      {
        url: 'https://next-pizza.up.railway.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Next Pizza - Оформление заказа',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Header
          hasCart={false}
          hasSearch={false}
          className="border-b-gray-200"
        />
        {children}
      </Container>
    </main>
  );
}
