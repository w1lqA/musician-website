// src/features/auth/model/store.ts
import type { User } from '@/features/auth/model/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isStaff: boolean;
    setAuth: (accessToken: string, refreshToken: string, user: User) => void;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isStaff: false,
            setAuth: (accessToken, refreshToken, user) => {
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);
                set({
                    accessToken,
                    refreshToken,
                    user,
                    isAuthenticated: true,
                    isStaff: user.isStaff,
                });
            },
            setUser: (user) => set({ user, isStaff: user.isStaff }),
            logout: () => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    isStaff: false,
                });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                isStaff: state.isStaff,
            }),
        }
    )
);