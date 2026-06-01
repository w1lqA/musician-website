// app/providers/AuthProvider.tsx
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/model/store';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const logout = useAuthStore(state => state.logout);
  useEffect(() => {
    const handleLogout = () => logout();
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, [logout]);
  return <>{children}</>;
};