// src/entities/release/hooks/useReleaseQueries.ts
import { useQuery } from '@tanstack/react-query';
import { releaseApi } from '@/shared/api';
import { mapReleasesToMusicItems } from '@/entities/release/lib/mapReleaseToMusicItem';

export const useFeaturedReleases = () => {
    return useQuery({
        queryKey: ['releases', 'featured'],
        queryFn: () => releaseApi.getFeaturedReleases(),
        select: (data) => mapReleasesToMusicItems(data),
        staleTime: 5 * 60 * 1000,
    });
};