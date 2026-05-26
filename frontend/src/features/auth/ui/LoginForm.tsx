// src/features/auth/ui/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/shared/ui/inputs/Input';
import { Button } from '@/shared/ui/Button';
import { useLogin } from '@/features/auth/hooks/useAuth';
import { loginSchema, type LoginFormData } from '@/features/auth/lib/validation';

export const LoginForm = () => {
    const navigate = useNavigate();
    const { mutate, isPending, error } = useLogin();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        mutate(data, {
            onSuccess: () => {
                navigate('/profile');
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
                type="password"
                placeholder="Пароль"
                {...register('password')}
                error={errors.password?.message}
            />
            {error && (
                <p className="text-accent-1 text-caption-regular text-center">
                    {(error as Error).message || 'Неверный email или пароль'}
                </p>
            )}
            <Button type="submit" disabled={isPending} size="medium" className="w-full">
                {isPending ? 'Вход...' : 'Войти'}
            </Button>
        </form>
    );
};