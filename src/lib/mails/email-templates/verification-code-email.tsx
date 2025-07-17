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
import { VerificationCodeEmailProps } from '../types';

export const VerificationCodeEmail = ({
  fullName,
  code,
}: VerificationCodeEmailProps) => (
  <Html>
    <Head />
    <Preview>Код подтверждения для Next Pizza</Preview>
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
            <Text className="text-lg mb-3">
              Привет, <strong>{fullName}</strong>!
            </Text>
            <Text className="text-base mb-3">
              Вот ваш код для подтверждения аккаунта:
            </Text>
            <Text className="text-center text-3xl font-bold tracking-widest text-brand my-6">
              {code}
            </Text>
            <Text className="text-sm text-gray-500">
              Если вы не запрашивали этот код, просто проигнорируйте это письмо.
            </Text>
          </Section>
          <div className="mt-6 text-center">
            <Button
              href={`http://localhost:3000/api/auth/verify?code=${code}`}
              className="bg-brand text-white py-3 px-6 rounded-md text-sm font-semibold inline-block"
            >
              Подтвердить регистрацию
            </Button>
          </div>

          <Section className="text-center text-xs text-gray-400 border-t border-gray-200 p-3">
            &copy; {new Date().getFullYear()} Next Pizza. Все права защищены.
          </Section>
        </Container>
      </Tailwind>
    </Body>
  </Html>
);
