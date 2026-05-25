// src/entities/concert/hooks/useConcertQueries.ts
import { useQuery } from '@tanstack/react-query';
import { concertApi } from '@/shared/api';
import { mapConcertsToTours } from '@/entities/concert/lib/mapConcertToTour';

export const useUpcomingConcerts = (params?: { limit?: number; city_id?: string; city_slug?: string }) => {
    return useQuery({
        queryKey: ['concerts', 'upcoming', params?.limit, params?.city_id, params?.city_slug],
        queryFn: () => concertApi.getUpcomingConcerts(params),
        select: (data) => mapConcertsToTours(data),
        staleTime: 5 * 60 * 1000,
    });
};

export const useConcertStats = () => {
    return useQuery({
        queryKey: ['concerts', 'stats'],
        queryFn: () => concertApi.getConcertStats(),
        staleTime: 10 * 60 * 1000,
    });
};

export const useCities = () => {
    return useQuery({
        queryKey: ['cities'],
        queryFn: () => concertApi.getCities(),
        staleTime: 10 * 60 * 1000,
    });
};