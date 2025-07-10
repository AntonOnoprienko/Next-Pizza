import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { OrderConfirmationEmail } from './order-confirm-email-component';
import { PaymentSuccessEmail } from './payment-success-email-component';
import { OrderConfirmEmailProps, PaymentSuccessEmailProps } from './types';

type EmailType = 'order-confirmation' | 'payment-success';

type EmailPropsMap = {
  'order-confirmation': OrderConfirmEmailProps;
  'payment-success': PaymentSuccessEmailProps;
};

const subjectMap = {
  'order-confirmation': 'Подтверждение заказа',
  'payment-success': 'Оплата подтверждена',
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
