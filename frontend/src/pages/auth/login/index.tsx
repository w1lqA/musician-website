// src/pages/auth/login/index.tsx
import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui/Container';
import { LoginForm } from '@/features/auth/ui/LoginForm';

export default function LoginPage() {
    return (
        <Container className="py-20">
            <div className="max-w-md mx-auto bg-primary-black-500 border border-primary-black-300 p-8">
                <h1 className="text-h3-display-bold text-primary-white-600 uppercase text-center mb-8">
                    Вход
                </h1>
                <LoginForm />
                <p className="text-center text-caption-regular text-primary-white-400 mt-6">
                    Нет аккаунта?{' '}
                    <Link to="/auth/register" className="text-accent-1 hover:underline">
                        Зарегистрироваться
                    </Link>
                </p>
            </div>
        </Container>
    );
}