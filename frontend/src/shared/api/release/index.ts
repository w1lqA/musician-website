// src/shared/api/release/index.ts
import { baseApi } from '@/shared/api/base';
import type { ReleaseDTO, CreateReleaseDTO, UpdateReleaseDTO, CreateTrackDTO, TrackDTO } from './types';

const buildReleaseFormData = (data: CreateReleaseDTO | UpdateReleaseDTO): FormData => {
    const formData = new FormData();

    Object.entries(data).forEach(([k, v]) => {
        // id, tracks и undefined пропускаем — обрабатываем отдельно
        if (v === undefined || k === 'tracks' || k === 'id') return;

        if (v instanceof File) {
            formData.append(k, v);
        } else if (typeof v === 'boolean') {
            formData.append(k, v ? 'true' : 'false');
        } else {
            formData.append(k, String(v));
        }
    });

    if (data.tracks && data.tracks.length > 0) {
        // Метаданные треков без файлов — отправляем как JSON
        const tracksMeta = data.tracks.map(({ file, ...rest }) => rest);
        formData.append('tracks', JSON.stringify(tracksMeta));

        // Аудиофайлы — каждый отдельным полем track_file_{index}
        // Django достанет их из request.FILES по этому ключу
        data.tracks.forEach((track, index) => {
            if (track.file instanceof File) {
                formData.append(`track_file_${index}`, track.file);
            }
        });
    }

    return formData;
};

export const releaseApi = {
    getReleases: async (params?: { featured?: boolean; limit?: number }): Promise<ReleaseDTO[]> => {
        const res = await baseApi.get('/releases/', { params });
        return res.data;
    },

    getFeaturedReleases: async (): Promise<ReleaseDTO[]> => {
        const res = await baseApi.get('/releases/featured/');
        return res.data;
    },

    getReleaseById: async (id: string): Promise<ReleaseDTO> => {
        const res = await baseApi.get(`/releases/${id}/`);
        return res.data;
    },

    createRelease: async (data: CreateReleaseDTO): Promise<ReleaseDTO> => {
        const formData = buildReleaseFormData(data);
        const res = await baseApi.post('/releases/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    },

    updateRelease: async (id: string, data: UpdateReleaseDTO): Promise<ReleaseDTO> => {
        const formData = buildReleaseFormData(data);
        const res = await baseApi.patch(`/releases/${id}/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    },

    deleteRelease: async (id: string): Promise<void> => {
        await baseApi.delete(`/releases/${id}/`);
    },

    deleteTrack: async (trackId: string): Promise<void> => {
        await baseApi.delete(`/tracks/${trackId}/`);
    },

    createTrack: async (data: CreateTrackDTO): Promise<TrackDTO> => {
        const formData = new FormData();
        Object.entries(data).forEach(([k, v]) => {
            if (v === undefined) return;
            if (v instanceof File) {
                formData.append(k, v);
            } else {
                formData.append(k, String(v));
            }
        });
        const res = await baseApi.post('/tracks/', formData);
        return res.data;
    },
};