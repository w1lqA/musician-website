// src/features/admin/hooks/useAdminReleases.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { releaseApi } from '@/shared/api/release';
import type { ReleaseFormData } from '@/entities/release';
import { mapFormDataToCreateDTO, mapFormDataToUpdateDTO } from '@/entities/release/lib/mapFormDataToDTO';

export const useAdminReleases = () => {
    return useQuery({
        queryKey: ['admin', 'releases'],
        queryFn: () => releaseApi.getReleases(),
        staleTime: 5 * 60 * 1000,
    });
};

export const useCreateRelease = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ReleaseFormData) => {
            const dto = mapFormDataToCreateDTO(data);
            return releaseApi.createRelease(dto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'releases'] });
            queryClient.invalidateQueries({ queryKey: ['releases'] });
        },
    });
};

export const useUpdateRelease = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: ReleaseFormData }) => {
            const dto = mapFormDataToUpdateDTO(id, data);
            return releaseApi.updateRelease(id, dto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'releases'] });
            queryClient.invalidateQueries({ queryKey: ['releases'] });
        },
    });
};

export const useDeleteRelease = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => releaseApi.deleteRelease(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'releases'] });
            queryClient.invalidateQueries({ queryKey: ['releases'] });
        },
    });
};