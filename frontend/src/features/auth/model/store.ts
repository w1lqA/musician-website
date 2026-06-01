// src/features/auth/model/store.ts
import type { User } from '@/features/auth/model/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { tokenManager } from '@/shared/api/token-manager';

interface AuthState {
    user: User | null;
    accessToken: string | null;
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
            isAuthenticated: false,
            isStaff: false,
            setAuth: (accessToken, refreshToken, user) => {
                tokenManager.setTokens(accessToken, refreshToken);
                set({
                    accessToken,
                    user,
                    isAuthenticated: true,
                    isStaff: user.isStaff,
                });
            },
            setUser: (user) => set({ user, isStaff: user.isStaff }),
            logout: () => {
                tokenManager.clearTokens();
                set({
                    accessToken: null,
                    user: null,
                    isAuthenticated: false,
                    isStaff: false,
                });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                accessToken: state.accessToken,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                isStaff: state.isStaff,
            }),
        }
    )
);