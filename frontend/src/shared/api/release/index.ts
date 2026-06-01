// src/shared/api/release/index.ts
import { baseApi } from '@/shared/api/base';
import type { ReleaseDTO, CreateReleaseDTO, UpdateReleaseDTO } from './types';

export const releaseApi = {
    getReleases: async (params?: { featured?: boolean; limit?: number }): Promise<ReleaseDTO[]> => {
        const response = await baseApi.get('/releases/', { params });
        return response.data;
    },

    getFeaturedReleases: async (): Promise<ReleaseDTO[]> => {
        const response = await baseApi.get('/releases/featured/');
        return response.data;
    },

    getReleaseById: async (id: string): Promise<ReleaseDTO> => {
        const response = await baseApi.get(`/releases/${id}/`);
        return response.data;
    },

    // CRUD методы (требуют админских прав)
    createRelease: async (data: CreateReleaseDTO): Promise<ReleaseDTO> => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            if (key === 'tracks' && Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else if (value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, String(value));
            }
        });
        const response = await baseApi.post('/releases/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    updateRelease: async (id: string, data: UpdateReleaseDTO): Promise<ReleaseDTO> => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value === undefined || value === null || key === 'id') return;
            if (key === 'tracks' && Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else if (value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, String(value));
            }
        });

        const response = await baseApi.put(`/releases/${id}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    deleteRelease: async (id: string): Promise<void> => {
        await baseApi.delete(`/releases/${id}/`);
    },
};