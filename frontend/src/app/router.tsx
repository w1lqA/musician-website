// src/app/router.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loader } from '@/shared/ui/feedback/Loader/Loader';
import { ProtectedRoute } from '@/widgets/ProtectedRoute';
import { AppLayout } from '@/app/AppLayout';

// публичные страницы
import HomePage from '@/pages/home';
import ProfilePage from '@/pages/profile';
const MerchDetailsPage = lazy(() => import('@/pages/merch-details'));
const LoginPage = lazy(() => import('@/pages/auth/login'));
const RegisterPage = lazy(() => import('@/pages/auth/register'));

// админские страницы (пока закомментированы)
// const AdminReleasesPage = lazy(() => import('@/pages/admin/releases'));
// const AdminReleaseCreatePage = lazy(() => import('@/pages/admin/releases/create'));
// const AdminReleaseEditPage = lazy(() => import('@/pages/admin/releases/[id]/edit'));

const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType>) => (
    <Suspense fallback={<Loader className='my-auto' message="Загрузка..." />}>
        <Component />
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            // публичные
            { index: true, element: <HomePage /> },
            { path: 'merch/:id', element: withSuspense(MerchDetailsPage) },

            // auth
            { path: 'auth/login', element: withSuspense(LoginPage) },
            { path: 'auth/register', element: withSuspense(RegisterPage) },

            // профиль (только авторизованные)
            {
                element: <ProtectedRoute redirectTo="/auth/login" />,
                children: [
                    { path: 'profile', element: <ProfilePage /> },
                ],
            },

            // админка (только для staff) - пока закомментировано
            // {
            //     element: <ProtectedRoute adminOnly redirectTo="/auth/login" />,
            //     children: [
            //         { path: 'admin/releases', element: withSuspense(AdminReleasesPage) },
            //         { path: 'admin/releases/new', element: withSuspense(AdminReleaseCreatePage) },
            //         { path: 'admin/releases/:id/edit', element: withSuspense(AdminReleaseEditPage) },
            //     ],
            // },

            // редирект на 404 потом
            { path: '*', element: <Navigate to="/" replace /> },
        ],
    },
]);