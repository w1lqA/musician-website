// src/features/admin/hooks/useAdminReleases.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { releaseApi } from '@/shared/api/release';
import type { ReleaseFormData } from '@/entities/release';
import type { CreateReleaseDTO, UpdateReleaseDTO } from '@/shared/api/release/types';

export const useAdminReleases = () => useQuery({
    queryKey: ['admin', 'releases'],
    queryFn: () => releaseApi.getReleases(),
    staleTime: 5 * 60 * 1000,
});

export const useCreateRelease = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: ReleaseFormData) => {
            const dto: CreateReleaseDTO = {
                title: data.title,
                artist: data.artist,
                type: data.type,
                release_date: data.release_date,
                description: data.description,
                is_featured: data.is_featured,
                cover: data.cover instanceof File ? data.cover : undefined,
                tracks: data.tracks?.map(t => ({
                    track_number: t.track_number,
                    title: t.title,
                    duration_seconds: t.duration_seconds,
                    ...(t.file instanceof File ? { file: t.file } : {}),
                })),
            };
            return releaseApi.createRelease(dto);
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['admin', 'releases'] });
            qc.invalidateQueries({ queryKey: ['releases'] });
        },
    });
};

export const useUpdateRelease = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: ReleaseFormData }) => {
            const dto: UpdateReleaseDTO = { id };
            if (data.title !== undefined) dto.title = data.title;
            if (data.artist !== undefined) dto.artist = data.artist;
            if (data.type !== undefined) dto.type = data.type;
            if (data.release_date !== undefined) dto.release_date = data.release_date;
            if (data.description !== undefined) dto.description = data.description;
            if (data.is_featured !== undefined) dto.is_featured = data.is_featured;
            if (data.cover instanceof File) dto.cover = data.cover;

            if (data.tracks !== undefined) {
                // Отправляем ВСЕ треки: и существующие (с id), и новые (без id)
                dto.tracks = data.tracks.map(track => ({
                    ...(track.id ? { id: track.id } : {}),
                    track_number: track.track_number,
                    title: track.title,
                    duration_seconds: track.duration_seconds,
                    ...(track.file instanceof File ? { file: track.file } : {}),
                }));
            }
            return releaseApi.updateRelease(id, dto);
        },
        onSuccess: (_, { id }) => {
            qc.invalidateQueries({ queryKey: ['admin', 'releases'] });
            qc.invalidateQueries({ queryKey: ['releases'] });
            qc.invalidateQueries({ queryKey: ['releases', id, 'raw'] });
        },
    });
};

export const useDeleteRelease = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => releaseApi.deleteRelease(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['admin', 'releases'] });
            qc.invalidateQueries({ queryKey: ['releases'] });
        },
    });
};

export const useDeleteTrack = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (trackId: string) => releaseApi.deleteTrack(trackId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['admin', 'releases'] });
            qc.invalidateQueries({ queryKey: ['releases'] });
        },
    });
};

export const useCreateTrack = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: { release_id: string; track_number: number; title: string; duration_seconds: number; file?: File }) =>
            releaseApi.createTrack(data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['admin', 'releases'] });
            qc.invalidateQueries({ queryKey: ['releases'] });
        },
    });
};