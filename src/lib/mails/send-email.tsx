import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import {
  OrderConfirmEmailProps,
  PaymentSuccessEmailProps,
  VerificationCodeEmailProps,
} from './types';
import {
  OrderConfirmationEmail,
  PaymentSuccessEmail,
  VerificationCodeEmail,
} from './email-templates';
type EmailType = 'order-confirmation' | 'payment-success' | 'verification-code';

type EmailPropsMap = {
  'order-confirmation': OrderConfirmEmailProps;
  'payment-success': PaymentSuccessEmailProps;
  'verification-code': VerificationCodeEmailProps;
};

const subjectMap = {
  'order-confirmation': 'Подтверждение заказа',
  'payment-success': 'Оплата подтверждена',
  'verification-code': 'Код подтверждения аккаунта',
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail<T extends EmailType>({
  type,
  to,
  props,
}: {
  type: T;
  to: string;
  props: EmailPropsMap[T];
}) {
  let html = '';

  switch (type) {
    case 'order-confirmation': {
      const p = props as EmailPropsMap['order-confirmation'];
      html = await render(<OrderConfirmationEmail {...p} />);
      break;
    }
    case 'payment-success': {
      const p = props as EmailPropsMap['payment-success'];
      html = await render(<PaymentSuccessEmail {...p} />);
      break;
    }
    case 'verification-code': {
      const p = props as EmailPropsMap['verification-code'];
      html = await render(<VerificationCodeEmail {...p} />);
      break;
    }
    default:
      throw new Error(`Unknown email type: ${type}`);
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: subjectMap[type] || 'Next Pizza',
    html,
  });
}
