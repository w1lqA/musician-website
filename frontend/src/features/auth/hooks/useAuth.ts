// src/features/auth/hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/shared/api/auth';
import { useAuthStore } from '@/features/auth/model/store';
import { mapUserToUI } from '@/features/auth/lib/mapUser';

export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            authApi.login({ email, password }),
        onSuccess: (data) => {
            const user = mapUserToUI({
                id: data.user_id,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                full_name: `${data.first_name} ${data.last_name}`.trim(),
                is_staff: data.is_staff,
                is_active: true,
                created_at: new Date().toISOString(),
            });
            setAuth(data.access, data.refresh, user);
            queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
        },
    });
};
export const useRegister = () => {
    return useMutation({
        mutationFn: authApi.register,
    });
};

export const useLogout = () => {
    const logout = useAuthStore((state) => state.logout);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            logout();
            queryClient.clear();
        },
    });
};

export const useMe = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const accessToken = useAuthStore((state) => state.accessToken);

    return useQuery({
        queryKey: ['user', 'me'],
        queryFn: async () => {
            const dto = await authApi.getMe();
            const userData = mapUserToUI(dto);
            setUser(userData);
            return userData;
        },
        enabled: !!accessToken,
        staleTime: 10 * 60 * 1000,
        retry: false,
    });
};