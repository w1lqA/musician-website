// src/shared/api/auth/index.ts
import { baseApi } from '@/shared/api/base';
import type { ChangePasswordRequestDTO, ChangePasswordResponseDTO, LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO, RegisterResponseDTO, UserDTO } from './types';

export const authApi = {
    login: async (data: LoginRequestDTO): Promise<LoginResponseDTO> => {
        const response = await baseApi.post('/auth/login/', data);
        return response.data;
    },

    logout: async (): Promise<{ message: string }> => {
        const response = await baseApi.post('/auth/logout/');
        return response.data;
    },

    register: async (data: RegisterRequestDTO): Promise<RegisterResponseDTO> => {
        const response = await baseApi.post('/auth/register/', data);
        return response.data;
    },

    getMe: async (): Promise<UserDTO> => {
        const response = await baseApi.get('/auth/me/');
        return response.data;
    },
    changePassword: async (data: ChangePasswordRequestDTO): Promise<ChangePasswordResponseDTO> => {
        const response = await baseApi.post('/auth/change-password/', data);
        return response.data;
    },
};