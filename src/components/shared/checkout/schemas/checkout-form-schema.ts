import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Имя должно содержать не менее двух символов' }),
  lastName: z
    .string()
    .min(2, { message: 'Фамилия должна содержать не менее двух символов' }),
  email: z.string().email({ message: 'Введите корректный email' }),
  phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
  address: z
    .string()
    .min(5, { message: 'Адрес должен содержать не менее 5 символов' }),
  comment: z.string().optional(),
});

export type CheckoutFormSchema = z.infer<typeof checkoutFormSchema>;
