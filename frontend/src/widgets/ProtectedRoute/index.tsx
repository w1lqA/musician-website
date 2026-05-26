// src/widgets/ProtectedRoute/index.tsx
import { useAuthStore } from '@/features/auth/model/store';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    adminOnly?: boolean;
    redirectTo?: string;
}

export const ProtectedRoute = ({ adminOnly = false, redirectTo = '/auth/login' }: ProtectedRouteProps) => {
    const { isAuthenticated, isStaff } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    if (adminOnly && !isStaff) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};