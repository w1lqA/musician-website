// src/widgets/header/ui/AuthButtons.tsx
import { Link } from 'react-router-dom';
import { LogIn, User } from 'lucide-react';
import { useAuthStore } from '@/features/auth/model/store';

interface AuthButtonsProps {
    onCloseMenu?: () => void;
}

export const AuthButtons = ({ onCloseMenu }: AuthButtonsProps) => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return (
            <Link
                to="/profile"
                onClick={onCloseMenu}
                className="p-2 text-primary-white-600 hover:text-accent-1 transition-colors"
                aria-label="Профиль"
            >
                <User className="w-6 h-6" strokeWidth={1.25} />
            </Link>
        );
    }

    return (
        <Link
            to="/auth/login"
            onClick={onCloseMenu}
            className="p-2 text-primary-white-600 hover:text-accent-1 transition-colors"
            aria-label="Войти"
        >
            <LogIn className="w-6 h-6" strokeWidth={1.25} />
        </Link>
    );
};
