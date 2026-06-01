// src/pages/profile/index.tsx
import { Container } from '@/shared/ui/Container';
import { useLogout, useMe } from '@/features/auth/hooks/useAuth';
import { Button } from '@/shared/ui/Button';
import { Mail, Calendar, User as UserIcon, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { EmptyState } from '@/shared/ui/feedback/EmptyState/EmptyState';
import { useAuthStore } from '@/features/auth/model/store';
import { Loader } from '@/shared/ui/feedback/Loader/Loader';

export default function ProfilePage() {
    const { isAuthenticated } = useAuthStore();
    const { data: user, isLoading, isError } = useMe();
    const { mutate: logout, isPending: isLoggingOut } = useLogout();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                navigate('/');
            },
        });
    };

    if (!isAuthenticated) {
        return (
            <Container className="py-20">
                <EmptyState message="Пожалуйста, войдите в аккаунт" />
            </Container>
        );
    }

    if (isLoading) {
        return (
            <Container className="py-20">
                <Loader message="Загрузка профиля..." />
            </Container>
        );
    }

    if (isError || !user) {
        return (
            <Container className="py-20">
                <EmptyState message="Не удалось загрузить профиль" />
            </Container>
        );
    }
    return (
        <Container className="py-20">
            <div className="max-w-2xl mx-auto">
                <div className="bg-primary-black-500 border border-primary-black-300 overflow-hidden">
                    <div className="bg-accent-1/10 p-6 border-b border-primary-black-300">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-accent-1 flex items-center justify-center">
                                <UserIcon className="w-8 h-8 text-primary-white-600" strokeWidth={1.25} />
                            </div>
                            <div>
                                <h1 className="text-h3-display-bold text-primary-white-600 uppercase">
                                    {user.fullName || 'Пользователь'}
                                </h1>
                                <p className="text-caption-regular text-primary-white-400">
                                    {user.isStaff ? 'Администратор' : 'Пользователь'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-title1-medium text-primary-white-600 uppercase border-b border-primary-black-300 pb-2">
                                Личная информация
                            </h2>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <UserIcon className="w-5 h-5 text-primary-white-400" strokeWidth={1.25} />
                                    <div>
                                        <p className="text-caption-regular text-primary-white-400">Имя и фамилия</p>
                                        <p className="text-body-regular text-primary-white-600">
                                            {user.fullName || 'Не указано'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-primary-white-400" strokeWidth={1.25} />
                                    <div>
                                        <p className="text-caption-regular text-primary-white-400">Email</p>
                                        <p className="text-body-regular text-primary-white-600">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-primary-white-400" strokeWidth={1.25} />
                                    <div>
                                        <p className="text-caption-regular text-primary-white-400">Дата регистрации</p>
                                        <p className="text-body-regular text-primary-white-600">
                                            {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {user.isStaff && (
                            <div className="pt-4 border-t border-primary-black-300">
                                <Link
                                    to="/dashboard"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-caption-regular text-accent-1 hover:underline"
                                >
                                    Админ-панель →
                                </Link>
                            </div>
                        )}

                        <div className="pt-4 border-t border-primary-black-300">
                            <Button
                                variant="secondary"
                                size="medium"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="w-full tablet:w-auto"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                {isLoggingOut ? 'Выход...' : 'Выйти'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}