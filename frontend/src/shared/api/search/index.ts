// src/shared/api/search/index.ts
import { baseApi } from '@/shared/api/base';
import type { SearchResponseDTO, SearchParams } from './types';

export const searchApi = {
    search: async (params: SearchParams): Promise<SearchResponseDTO> => {
        const response = await baseApi.get('/search/search/', { params });
        return response.data;
    },
};
