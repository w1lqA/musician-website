// src/shared/api/release/types.ts

// ---------------------------------------------------------------------------
// Входящие DTO (с сервера) — файлы всегда URL-строки
// ---------------------------------------------------------------------------

export interface TrackDTO {
    id: string;
    track_number: number;
    title: string;
    duration_seconds: number;
    duration: string;
    file: string;        // с сервера всегда URL
}

export interface ReleaseDTO {
    id: string;
    title: string;
    artist: string;
    type: 'album' | 'single' | 'ep' | 'live' | 'compilation';
    type_display: string;
    release_date: string;
    cover_url: string;
    description?: string;
    tracks: TrackDTO[];
    is_featured: boolean;
    created_at?: string;
}

// ---------------------------------------------------------------------------
// Исходящие DTO (на сервер) — файлы только File, строк нет
// ---------------------------------------------------------------------------

export interface CreateTrackDTO {
    track_number: number;
    title: string;
    duration_seconds: number;
    file?: File;         // загружается только при создании
}

export interface UpdateTrackDTO {
    id?: string;         // есть у существующих треков, нет у новых
    track_number: number;
    title: string;
    duration_seconds: number;
    file?: File;         // загружается только если пользователь выбрал новый файл
}

export interface CreateReleaseDTO {
    title: string;
    artist: string;
    type: string;
    release_date: string;
    description?: string;
    is_featured?: boolean;
    cover?: File;        // загружается только при создании/смене обложки
    tracks?: CreateTrackDTO[];
}

export interface UpdateReleaseDTO {
    id: string;
    title?: string;
    artist?: string;
    type?: string;
    release_date?: string;
    description?: string;
    is_featured?: boolean;
    cover?: File;        // загружается только если пользователь выбрал новую обложку
    tracks?: UpdateTrackDTO[];
}