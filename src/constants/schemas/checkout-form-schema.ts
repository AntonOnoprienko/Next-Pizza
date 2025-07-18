import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Имя должно содержать не менее двух символов' }),
  lastName: z
    .string()
    .min(2, { message: 'Фамилия должна содержать не менее двух символов' }),
  email: z.string().email({ message: 'Введите корректный email' }),
  phone: z.string().regex(/^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
    message: 'Введите корректный номер телефона',
  }),
  city: z
    .string()
    .min(2, { message: 'Город должен содержать не менее двух символов' }),
  street: z
    .string()
    .min(2, { message: 'Улица должна содержать не менее двух символов' }),
  house: z.string().min(1, { message: 'Укажите номер дома и номер квартиры' }),
  comment: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
