// src/shared/api/release/types.ts
export interface TrackDTO {
    id: string;
    track_number: number;
    title: string;
    duration: string;
    file: string;
}

export interface ReleaseDTO {
    id: string;
    title: string;
    artist: string;
    type: 'album' | 'single' | 'ep' | 'live' | 'compilation';
    type_display: string;
    release_date: string;
    cover: string;
    description?: string;
    tracks: TrackDTO[];
    is_featured: boolean;
    created_at?: string;
}

export interface CreateTrackDTO {
    track_number: number;
    title: string;
    duration_seconds: number;
    file?: File | string;
}

export interface CreateReleaseDTO {
    title: string;
    artist: string;
    type: string;
    release_date: string;
    description?: string;
    is_featured?: boolean;
    cover?: File | string;
    tracks?: CreateTrackDTO[];
}

export interface UpdateReleaseDTO extends Partial<CreateReleaseDTO> {
    id: string;
}