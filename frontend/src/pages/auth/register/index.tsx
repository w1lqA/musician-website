// src/pages/auth/register/index.tsx
import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui/Container';
import { RegisterForm } from '@/features/auth/ui/RegisterForm';

export default function RegisterPage() {
    return (
        <Container className="py-20">
            <div className="max-w-md mx-auto bg-primary-black-500 border border-primary-black-300 p-8">
                <h1 className="text-h3-display-bold text-primary-white-600 uppercase text-center mb-8">
                    Регистрация
                </h1>
                <RegisterForm />
                <p className="text-center text-caption-regular text-primary-white-400 mt-6">
                    Уже есть аккаунт?{' '}
                    <Link to="/auth/login" className="text-accent-1 hover:underline">
                        Войти
                    </Link>
                </p>
            </div>
        </Container>
    );
}