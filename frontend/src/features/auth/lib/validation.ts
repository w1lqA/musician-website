// src/features/auth/lib/validation.ts
import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string()
        .min(1, 'Email обязателен')
        .email('Неверный формат email'),
    password: z.string()
        .min(1, 'Пароль обязателен'),
});

export const registerSchema = z.object({
    email: z.string()
        .min(1, 'Email обязателен')
        .email('Неверный формат email'),
    password: z.string()
        .min(6, 'Пароль должен содержать минимум 6 символов'),
    password2: z.string()
        .min(1, 'Подтверждение пароля обязательно'),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
}).refine((data) => data.password === data.password2, {
    message: 'Пароли не совпадают',
    path: ['password2'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;