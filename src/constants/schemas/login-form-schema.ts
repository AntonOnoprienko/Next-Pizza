import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(6, { message: 'Пароль должен быть не менее 6 символов' });

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  password: passwordSchema,
});

export const registerFormSchema = loginFormSchema
  .merge(
    z.object({
      fullName: z
        .string()
        .min(2, { message: 'Введите имя и фамилию' })
        .refine((val) => val.trim().split(' ').length >= 2, {
          message: 'Введите имя и фамилию через пробел',
        }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });

export const updateUserSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  fullName: z
    .string()
    .min(2, { message: 'Введите имя и фамилию' })
    .refine((val) => val.trim().split(' ').length >= 2, {
      message: 'Введите имя и фамилию через пробел',
    }),
  password: passwordSchema,
});
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;
