import { prisma } from '@/prisma/prisma-client';
import { Container, Title } from '@/src/components/shared/';
import { Button } from '@/src/components/ui';
import Link from 'next/link';

type Props = {
  searchParams: {
    token?: string;
  };
};

const PaidPage = async ({ searchParams }: Props) => {
  const token = searchParams.token;

  if (!token) {
    return (
      <Container className="mt-10 text-center">
        <Title size="lg" text="Ошибка" className="font-extrabold mb-4" />
        <p>Не указан номер заказа.</p>
      </Container>
    );
  }

  const order = await prisma.order.findUnique({
    where: { token: token },
  });

  if (!order) {
    return (
      <Container className="mt-10 text-center">
        <Title
          size="lg"
          text="Заказ не найден"
          className="font-extrabold mb-4"
        />
      </Container>
    );
  }

  let message = '';
  switch (order.status) {
    case 'SUCCEEDED':
      message = 'Спасибо! Оплата прошла успешно.';
      break;
    case 'PENDING':
      message = 'Оплата ожидается. Пожалуйста, подождите.';
      break;
    case 'CANCELLED':
      message = 'Оплата не прошла или была отменена.';
      break;
    default:
      message = 'Статус заказа неизвестен.';
  }

  return (
    <Container className="mt-10 max-w-lg text-center">
      <Title size="lg" text={message} className="font-extrabold mb-6" />
      <p className="mb-2">
        <strong>Номер заказа:</strong> {order.id}
      </p>
      <p className="mb-6">
        <strong>Сумма оплаты:</strong> {order.totalAmount} ₴
      </p>
      <Link href="/">
        <Button aria-label="Вернуться на главную страницу">
          Вернуться на главную
        </Button>
      </Link>
    </Container>
  );
};

export default PaidPage;
