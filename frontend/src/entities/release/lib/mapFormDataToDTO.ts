// src/entities/release/lib/mappers.ts
import type { ReleaseFormData } from '@/entities/release';
import type { CreateReleaseDTO, UpdateReleaseDTO } from '@/shared/api/release/types';

export const mapFormDataToCreateDTO = (data: ReleaseFormData): CreateReleaseDTO => ({
    title: data.title,
    artist: data.artist,
    type: data.type,
    release_date: data.release_date,
    description: data.description,
    is_featured: data.is_featured,
    cover: data.cover instanceof File ? data.cover : undefined,
    tracks: data.tracks?.map(track => ({
        track_number: track.track_number,
        title: track.title,
        duration_seconds: track.duration_seconds,
        file: track.file instanceof File ? track.file : undefined,
    })),
});

export const mapFormDataToUpdateDTO = (id: string, data: ReleaseFormData): UpdateReleaseDTO => ({
    id,
    title: data.title,
    artist: data.artist,
    type: data.type,
    release_date: data.release_date,
    description: data.description,
    is_featured: data.is_featured,
    cover: data.cover instanceof File ? data.cover : undefined,
    tracks: data.tracks?.map(track => ({
        id: track.id,
        track_number: track.track_number,
        title: track.title,
        duration_seconds: track.duration_seconds,
        file: track.file instanceof File ? track.file : undefined,
    })),
});