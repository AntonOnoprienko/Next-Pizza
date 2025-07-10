import {
  Html,
  Head,
  Preview,
  Body,
  Tailwind,
  Container,
  Section,
  Heading,
  Text,
  Button,
} from '@react-email/components';
import { OrderConfirmEmailProps } from './types';

export const OrderConfirmationEmail: React.FC<OrderConfirmEmailProps> = ({
  fullName,
  items,
  totalAmount,
  paymentUrl,
  address,
}) => (
  <Html>
    <Head />
    <Preview>Подтверждение заказа в Next Pizza</Preview>
    <Body className="bg-gray-100 font-sans">
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#FF5E00',
              },
            },
          },
        }}
      >
        <Container className="max-w-xl mx-auto bg-white rounded-lg shadow-md">
          <Section className="bg-brand p-5 rounded-t-lg text-center">
            <Heading className="text-white text-2xl font-bold">
              Next Pizza
            </Heading>
          </Section>

          <Section className="p-5 text-left">
            <Text className="text-lg mb-2">
              Привет, <strong>{fullName}</strong>! Спасибо за ваш заказ.
            </Text>
            <Text className="text-sm mb-5">
              Адрес доставки: <strong>{address}</strong>
            </Text>

            <table
              className="w-full text-sm"
              cellPadding={0}
              cellSpacing={0}
              style={{ borderCollapse: 'collapse' }}
            >
              <thead>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <th align="left" className="py-2 text-gray-500 font-semibold">
                    Товар
                  </th>
                  <th
                    align="center"
                    className="py-2 text-gray-500 font-semibold"
                    style={{ minWidth: '50px' }}
                  >
                    Кол-во
                  </th>
                  <th
                    align="right"
                    className="py-2 text-gray-500 font-semibold"
                    style={{ minWidth: '60px' }}
                  >
                    Цена
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  const extras = item.extraIngredients || [];
                  const excluded = item.excludedIngredients || [];

                  return (
                    <tr key={i} className="border-t border-gray-100 align-top">
                      <td className="py-2 pr-4 align-top">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500 leading-snug">
                          {item.type && `Тип: ${item.type}; `}
                          {item.size && `Размер: ${item.size}; `}
                          {extras.length > 0 && (
                            <span className="text-green-600">
                              + Доп.: {extras.join(', ')};{' '}
                            </span>
                          )}
                          {excluded.length > 0 && (
                            <span className="text-red-500">
                              - Искл.: {excluded.join(', ')}
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className="py-2 text-center align-top"
                        style={{ minWidth: '50px' }}
                      >
                        {item.quantity}
                      </td>
                      <td
                        className="py-2 text-right align-top"
                        style={{ minWidth: '60px' }}
                      >
                        {(item.price * item.quantity).toFixed(2)} ₴
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-4 text-right font-bold text-base">
              Итого: {totalAmount.toFixed(2)} ₴
            </div>

            <div className="mt-6 text-center">
              <Button
                href={paymentUrl}
                className="bg-brand text-white py-3 px-6 rounded-md text-sm font-semibold inline-block"
              >
                Перейти к оплате
              </Button>
            </div>
          </Section>

          <Section className="text-center text-xs text-gray-400 border-t border-gray-200 p-3">
            &copy; {new Date().getFullYear()} Next Pizza. Все права защищены.
          </Section>
        </Container>
      </Tailwind>
    </Body>
  </Html>
);
