// src/features/search/hooks/useSearch.ts
import { useQuery } from '@tanstack/react-query';
import { searchApi } from '@/shared/api';
import { mapSearchResultsToUI } from '@/features/search/lib/mapSearchResult';
import type { SearchParams } from '@/shared/api/search/types';

interface UseSearchParams extends SearchParams {
    enabled?: boolean;
}

export const useSearch = ({ q, type = 'all', sort = 'relevance', enabled = true }: UseSearchParams) => {
    return useQuery({
        queryKey: ['search', q, type, sort],
        queryFn: () => searchApi.search({ q, type, sort }),
        select: (data) => ({
            results: mapSearchResultsToUI(data.results),
            count: data.count,
            query: data.query,
        }),
        enabled: enabled && q.trim().length > 0,
        staleTime: 5 * 60 * 1000,
    });
};