// src/entities/release/model/types.ts
export interface Track {
    id: string;
    track_number: number;
    title: string;
    duration: string;
    file: string;
    duration_seconds?: number;
}

export interface Release {
    id: string;
    title: string;
    artist: string;
    type: 'album' | 'single' | 'ep' | 'live' | 'compilation';
    type_display: string;
    release_date: string;
    cover: string;
    description?: string;
    tracks: Track[];
    is_featured: boolean;
    created_at?: string;
}

export interface MusicItem {
    id: string;
    title: string;
    artist: string;
    cover: string;
    releaseDate: string;
    type: string;
    isFeatured?: boolean;
}

export interface TrackFormData {
    id?: string;
    track_number: number;
    title: string;
    duration_seconds: number;
    file?: File | string;
}

export interface ReleaseFormData {
    title: string;
    artist: string;
    type: string;
    release_date: string;
    description?: string;
    is_featured: boolean;
    cover?: File | string;
    tracks: TrackFormData[];
}