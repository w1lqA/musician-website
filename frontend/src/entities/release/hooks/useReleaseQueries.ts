// src/entities/release/hooks/useReleaseQueries.ts
import { useQuery } from '@tanstack/react-query';
import { releaseApi } from '@/shared/api';
import { mapReleaseToMusicItem, mapReleasesToMusicItems } from '@/entities/release/lib/mapReleaseToMusicItem';

export const useFeaturedReleases = () => {
    return useQuery({
        queryKey: ['releases', 'featured'],
        queryFn: () => releaseApi.getFeaturedReleases(),
        select: (data) => mapReleasesToMusicItems(data),
        staleTime: 5 * 60 * 1000,
    });
};

export const useReleaseById = (id: string) => {
    return useQuery({
        queryKey: ['releases', id],
        queryFn: () => releaseApi.getReleaseById(id),
        select: (data) => mapReleaseToMusicItem(data),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};

// для админки - получаем сырые DTO без маппинга
export const useReleaseRawById = (id: string) => {
    return useQuery({
        queryKey: ['releases', id, 'raw'],
        queryFn: () => releaseApi.getReleaseById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};