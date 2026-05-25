// src/shared/api/concert/index.ts
import { baseApi } from '@/shared/api/base';
import type { ConcertDTO, ConcertStatsDTO, CityDTO } from './types';

export const concertApi = {
    getConcerts: async (params?: {
        upcoming?: boolean;
        past?: boolean;
        city_id?: string;
        limit?: number;
        search?: string;
    }): Promise<ConcertDTO[]> => {
        const response = await baseApi.get('/concerts/', { params });
        if (response.data && Array.isArray(response.data.results)) {
            return response.data.results;
        }
        return response.data;
    },

    getUpcomingConcerts: async (params?: {
        limit?: number;
        city_id?: string;
        city_slug?: string;
    }): Promise<ConcertDTO[]> => {
        const response = await baseApi.get('/concerts/upcoming/', { params });
        return response.data;
    },

    getConcertById: async (id: string): Promise<ConcertDTO> => {
        const response = await baseApi.get(`/concerts/${id}/`);
        return response.data;
    },

    getConcertStats: async (): Promise<ConcertStatsDTO> => {
        const response = await baseApi.get('/concerts/stats/');
        return response.data;
    },

    getCities: async (): Promise<CityDTO[]> => {
        const response = await baseApi.get('/cities/');
        return response.data;
    },
};