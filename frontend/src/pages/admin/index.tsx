// src/pages/admin/index.tsx
import { Container } from '@/shared/ui/Container';
import { useAuthStore } from '@/features/auth/model/store';
import { Navigate, Link } from 'react-router-dom';
import { Album, Package, Calendar, Users, Tag, Shield } from 'lucide-react';

const adminModules = [
    {
        title: 'Релизы',
        description: 'Управление музыкальными релизами и треками',
        icon: Album,
        path: '/admin/releases',
    },
    {
        title: 'Товары',
        description: 'Управление мерчем и товарами',
        icon: Package,
        path: '/admin/products',
    },
    {
        title: 'Концерты',
        description: 'Управление концертами и билетами',
        icon: Calendar,
        path: '/admin/concerts',
    },
    {
        title: 'Пользователи',
        description: 'Управление пользователями',
        icon: Users,
        path: '/admin/users',
    },
    {
        title: 'Промокоды',
        description: 'Управление промокодами',
        icon: Tag,
        path: '/admin/discounts',
    },
    {
        title: 'Права доступа',
        description: 'Управление ролями и правами',
        icon: Shield,
        path: '/admin/permissions',
    },
];

export default function AdminPage() {
    const { isAuthenticated, isStaff } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    if (!isStaff) {
        return <Navigate to="/" replace />;
    }

    return (
        <Container className="py-20">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-h3-display-bold text-primary-white-600 uppercase mb-2">
                        Админ-панель
                    </h1>
                    <p className="text-caption-regular text-primary-white-400">
                        Управление контентом сайта
                    </p>
                </div>

                <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-5">
                    {adminModules.map((module) => {
                        const Icon = module.icon;
                        return (
                            <Link
                                key={module.path}
                                to={module.path}
                                className="bg-primary-black-500 border border-primary-black-300 p-6 transition-all hover:border-accent-1 hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-lg bg-accent-1/10 flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-accent-1" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-title2-medium text-primary-white-600 mb-1">
                                    {module.title}
                                </h3>
                                <p className="text-caption-regular text-primary-white-400">
                                    {module.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </Container>
    );
}