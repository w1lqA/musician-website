import { baseApi } from '@/shared/api/base';
import type { ReleaseDTO } from '@/shared/api/release/types';

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
};