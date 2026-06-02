// src/entities/release/lib/mapFormDataToDTO.ts
import type { ReleaseFormData } from '@/entities/release';
import type { CreateReleaseDTO, UpdateReleaseDTO } from '@/shared/api/release/types';

export const mapFormDataToCreateDTO = (data: ReleaseFormData): CreateReleaseDTO => {
    const result: CreateReleaseDTO = {
        title: data.title,
        artist: data.artist,
        type: data.type,
        release_date: data.release_date,
        description: data.description || '',
        is_featured: data.is_featured,
    };

    if (data.cover instanceof File) {
        result.cover = data.cover;
    }

    if (data.tracks && data.tracks.length > 0) {
        result.tracks = data.tracks.map(track => ({
            track_number: track.track_number,
            title: track.title,
            duration_seconds: track.duration_seconds,
            ...(track.file instanceof File ? { file: track.file } : {}),
        }));
    }

    return result;
};

export const mapFormDataToUpdateDTO = (id: string, data: ReleaseFormData): UpdateReleaseDTO => {
    const result: UpdateReleaseDTO = {
        id,
        title: data.title,
        artist: data.artist,
        type: data.type,
        release_date: data.release_date,
        description: data.description || '',
        is_featured: data.is_featured,
    };

    if (data.cover instanceof File) {
        result.cover = data.cover;
    }

    if (data.tracks && data.tracks.length > 0) {
        result.tracks = data.tracks.map(track => ({
            // id опционален в UpdateTrackDTO — новые треки без id создаются на бэке
            ...(track.id ? { id: track.id } : {}),
            track_number: track.track_number,
            title: track.title,
            duration_seconds: track.duration_seconds,
            ...(track.file instanceof File ? { file: track.file } : {}),
        }));
    }

    return result;
};