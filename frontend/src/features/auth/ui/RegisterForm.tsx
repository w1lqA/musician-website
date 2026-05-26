// src/features/auth/ui/RegisterForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/shared/ui/inputs/Input';
import { Button } from '@/shared/ui/Button';
import { useRegister } from '@/features/auth/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '@/features/auth/lib/validation';

export const RegisterForm = () => {
    const navigate = useNavigate();
    const { mutate, isPending, error } = useRegister();

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormData) => {
        mutate(data, {
            onSuccess: () => {
                navigate('/auth/login');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
                type="email"
                placeholder="Email"
                {...register('email')}
                error={errors.email?.message}
            />
            <Input
                type="text"
                placeholder="Имя (необязательно)"
                {...register('first_name')}
                error={errors.first_name?.message}
            />
            <Input
                type="text"
                placeholder="Фамилия (необязательно)"
                {...register('last_name')}
                error={errors.last_name?.message}
            />
            <Input
                type="password"
                placeholder="Пароль"
                {...register('password')}
                error={errors.password?.message}
            />
            <Input
                type="password"
                placeholder="Подтвердите пароль"
                {...register('password2')}
                error={errors.password2?.message}
            />
            {error && (
                <p className="text-accent-1 text-caption-regular text-center">
                    {(error as Error).message || 'Ошибка регистрации'}
                </p>
            )}
            <Button type="submit" disabled={isPending} size="medium" className="w-full">
                {isPending ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
        </form>
    );
};
